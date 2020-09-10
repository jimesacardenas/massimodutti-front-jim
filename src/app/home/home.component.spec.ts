import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeComponent } from './home.component';
import { StarShipsService } from './star-ships.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const starShipMock = {
    name: 'Sentinel-class landing craft',
    model: 'Sentinel-class landing craft',
    max_atmosphering_speed: '1000',
    manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
    starship_class: 'landing craft',
    length: '38',
    url: 'http://swapi.dev/api/starships/5/'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        CoreModule,
        SharedModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
      ],
      declarations: [HomeComponent],
      providers: [StarShipsService, TranslateModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should callCreateModal', () => {
    component.callCreateModal()
    expect(component.callCreateModal()).toBeUndefined();
  });

  it('should callCreateModal', () => {
    component.callCreateModal();
    expect(component.callCreateModal()).toBeUndefined();
  });

  it('should callEditModal', () => {
    component.callEditModal(starShipMock);
    expect(component.callCreateModal()).toBeUndefined();
  });

  it('should callDeleteModal', () => {
    component.callDeleteModal(starShipMock);
    expect(component.callCreateModal()).toBeUndefined();
  });
});
