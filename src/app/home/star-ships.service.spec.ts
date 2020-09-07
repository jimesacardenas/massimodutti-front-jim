import { Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule } from '@core';
import { StarShipsService, IApiResponse } from './star-ships.service';

describe('StarShipsService', () => {
  let starShipsService: StarShipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
    });

    starShipsService = TestBed.inject(StarShipsService);
  });

  describe('StarShipsService', () => {
    it('get starShip', () => {

      // Act
      const request = starShipsService.get(1);

      // Assert
      request.subscribe((resp: IApiResponse) => {
        expect(resp).toBeDefined();
      });
    });

    it('create starShip', () => {
      // Act
      const request = starShipsService.create({
        name: 'starShip-name',
        model: 'starShip-model',
        max_atmosphering_speed: '1000',
        manufacturer: 'audi',
        starship_class: 'one',
        length: '1200',
        url: 'http://localhost/1.jpg'
      });

      // Assert
      request.subscribe((resp: any) => {
        expect(resp).toBeDefined();
      });
    });

    it('update starShip', () => {
      // Act
      const sShip = {
        name: 'starShip-name',
        model: 'starShip-model',
        max_atmosphering_speed: '1000',
        manufacturer: 'audi',
        starship_class: 'one',
        length: '1200',
        url: 'http://localhost/1.jpg'
      };

      const createreq = starShipsService.create(sShip);
      createreq.subscribe();

      sShip.name = 'starShip-name-002';
      const updatereq = starShipsService.update('http://localhost/1.jpg', sShip);

      // Assert
      updatereq.subscribe((resp: any) => {
        expect(resp.name).not.toEqual('starShip-name');
      });
    });

    it('delete starShip', () => {
      // Act
      const sShip = {
        name: 'starShip-name',
        model: 'starShip-model',
        max_atmosphering_speed: '1000',
        manufacturer: 'audi',
        starship_class: 'one',
        length: '1200',
        url: 'http://localhost/1.jpg'
      };

      const createreq = starShipsService.create(sShip);
      createreq.subscribe();

      const updatereq = starShipsService.delete(sShip);

      // Assert
      updatereq.subscribe((resp: any) => {
        expect(resp.name).toBeDefined();
      });
    });

    it('get starShip', () => {
      // Act
      const getreq = starShipsService.get(1);

      // Assert
      getreq.subscribe((resp: any) => {
        expect(resp).toBeDefined();
      });
    });

  });
});
