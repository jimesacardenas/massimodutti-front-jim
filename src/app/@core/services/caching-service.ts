import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CachingService {
    private cache = new Map<string, [Date, HttpResponse<any>]>();

    constructor() {
    }

    get(key: string): HttpResponse<any> {
        const tuple = this.cache.get(key);
        if (!tuple) {
            return null;
        }

        const expires = tuple[0];
        const httpResponse = tuple[1];

        // check if cached HttpResponse is expired, if it is, delete
        // it and respond as if we had nothing cached
        const now = new Date();
        if (expires && expires.getTime() < now.getTime()) {
            this.cache.delete(key);
            return null;
        }
        console.log('Retrieved from cache!');
        console.log(httpResponse);
        console.log('The above cached HttpResponse object has been mutated by the mapping function in fetcher.service.ts');
        return httpResponse;
    }

    set(key: string, value: HttpResponse<any>, ttl: any = null) {
        if (ttl) {
            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + ttl);
            this.cache.set(key, [expires, value]);
        } else {
            this.cache.set(key, [null, value]);
        }
        return true;
    }

}