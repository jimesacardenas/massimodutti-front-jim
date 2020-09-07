import { Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule } from '@core';
import { StarShipsService, IApiResponse } from './star-ships.service';

describe('QuoteService', () => {
  let starShipsService: StarShipsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [starShipsService],
    });

    starShipsService = TestBed.inject(StarShipsService);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getRandomQuote', () => {
    it('should return a random Chuck Norris quote', () => {
      // Arrange
      const mockShips = { };

      // Act
      const randomQuoteSubscription = starShipsService.get(1);

      // Assert
      randomQuoteSubscription.subscribe((resp: IApiResponse) => {
        expect(resp).toEqual(starShipsService.get);
      });
      httpMock.expectOne({}).flush(mockShips);
    });

    it('should return a string in case of error', () => {
      // Act
      const randomQuoteSubscription = starShipsService.get(1);

      // Assert
      randomQuoteSubscription.subscribe((resp: IApiResponse) => {
        expect(typeof resp).toEqual('object');
        expect(resp).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error',
      });
    });
  });
});
