import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CachingService } from '../services/caching-service';
import { Injectable } from '@angular/core';

const TTL = 5;

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: CachingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(request.method === 'GET')) {
      return next.handle(request);
    } else {
      console.log('Checking cache for data.');
      const cachedResponse = this.cache.get(request.url);
      return cachedResponse ? of(cachedResponse) : this.handleRequest(request, next);
    }
  }

  private handleRequest(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    return next.handle(request).pipe(tap(event => {

      if (event instanceof HttpResponse) {
        this.cache.set(request.url, event, TTL);
      }
    }));
  }
}