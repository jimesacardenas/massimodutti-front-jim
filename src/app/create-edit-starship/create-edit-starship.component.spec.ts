import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CreateEditStarshipComponent } from './create-edit-starship.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StarShipsService } from '@app/home/star-ships.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';
import { SharedModule } from '@app/@shared';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '@app/i18n';

describe('CreateEditShipComponent', () => {
  let component: CreateEditStarshipComponent;
  let fixture: ComponentFixture<CreateEditStarshipComponent>;
  let starShipsService: StarShipsService;

  const starShipMock = {
    name: 'starShip-name',
    model: 'starShip-model',
    max_atmosphering_speed: '1000',
    manufacturer: 'audi',
    starship_class: 'one',
    length: '1200',
    url: 'http://localhost/1.jpg'
  }

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditStarshipComponent ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA, useValue: starShipMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
    });

    starShipsService = TestBed.inject(StarShipsService);

    fixture = TestBed.createComponent(CreateEditStarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load edit', () => {
    component.data = {starShip: starShipMock};
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should create a starShip', fakeAsync(() => {
    const starShipCreateMock = {
      name: 'Sentinel-class landing craft',
      model: 'Sentinel-class landing craft',
      max_atmosphering_speed: '1200',
      manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
      starship_class: 'landing craft',
      length: '120',
      url: 'http://swapi.dev/api/starships/000-123-234/'
    }
    // component.data = { starShip: starShipCreateMock };
    component.ngOnInit();
    component.createEditForm.controls.name.setValue(starShipCreateMock.name);
    component.createEditForm.controls.model.setValue(starShipCreateMock.model);
    component.createEditForm.controls.manufacturer.setValue(starShipCreateMock.manufacturer);
    component.createEditForm.controls.starship_class.setValue(starShipCreateMock.starship_class);
    component.createEditForm.controls.max_atmosphering_speed.setValue(starShipCreateMock.max_atmosphering_speed);
    component.createEditForm.controls.length.setValue(starShipCreateMock.length);
    component.createEditForm.controls.url.setValue(starShipCreateMock.url);
    component.excAction();

    const get = starShipsService.get(1).subscribe(resp => {
      expect(resp.results.find(x => x.url === starShipCreateMock.url)).toBeDefined();
    });
 
  }));

});
