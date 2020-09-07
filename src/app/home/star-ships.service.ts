import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  shipsApiUrl: 'https://swapi.dev/api/starships',
  shipsimageApiUrl: 'https://starwars-visualguide.com/assets/img/starships/'
};

export interface IApiResponse {
  count?: number;
  next?: string;
  previous?: string;
  results?: IStarShips[];
}

export interface IStarShips {
  name?: string;
  model?: string;
  max_atmosphering_speed?: string;
  manufacturer?: string;
  starship_class?: string;
  length?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class StarShipsService {
  constructor(private httpClient: HttpClient) { }

  get starShips(): IStarShips[] {
    const _starShips = localStorage.getItem('start-ships');
    if (_starShips) {
      return JSON.parse(_starShips) as IStarShips[];
    }
    return [];
  }
  set starShips(value: IStarShips[]) {
    localStorage.setItem('start-ships', JSON.stringify(value));
  }

  get starShipDeleted(): string[] {
    const _starShips = localStorage.getItem('start-ships-deleted');
    if (_starShips) {
      return JSON.parse(_starShips) as string[];
    }
    return [];
  }
  set starShipDeleted(value: string[]) {
    localStorage.setItem('start-ships-deleted', JSON.stringify(value));
  }

  get(page: number): Observable<IApiResponse> {
    return this.httpClient.get(`${routes.shipsApiUrl}?page=${page}`).pipe(
      map((body: any) => {
        body.results = body?.results.filter((x: any) => !this.starShipDeleted
        .includes(x.url)).map((element: IStarShips) => {
          const result = element;
          result.url = `${routes.shipsimageApiUrl}${element.url.substr(-2, 1)}.jpg`;
          return result;
        });
        if (page === 1){
          body.results = this.starShips.concat(body?.results);
        }
        body.count += this.starShips.length;
        return body;
      }),
      catchError(() => of('Error, could not load joke :-('))
    );
  }

  create(value: IStarShips): Observable<IStarShips> {
    const _startShips = this.starShips;
    _startShips.push(value);
    this.starShips = _startShips;
    return of(value);
  }

  update(id: string, value: IStarShips): Observable<IStarShips> {
    const _starShips = this.starShips;
    const index = _starShips.findIndex(x => x.url === id);

    if (index !== -1){
      _starShips[index] = value;
      this.starShips = _starShips;
    }

    return of(value);
  }

  delete(value: IStarShips): Observable<IStarShips> {
    const index = this.starShips.findIndex(x => x.url === value.url);

    if (index !== -1){
      this.starShips = this.starShips.filter(x => x.url !== value.url);
    } else {
      const _starShipDeleted = this.starShipDeleted;
      _starShipDeleted.push(value.url);
      this.starShipDeleted = _starShipDeleted;
    }

    return of(value);
  }
}
