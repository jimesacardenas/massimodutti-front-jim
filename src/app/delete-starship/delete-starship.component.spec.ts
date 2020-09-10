import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteStarshipComponent } from './delete-starship.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeleteStarshipComponent', () => {
  let component: DeleteStarshipComponent;
  let fixture: ComponentFixture<DeleteStarshipComponent>;

  const starShipMock = {
    name: 'Sentinel-class landing craft',
    model: 'Sentinel-class landing craft',
    max_atmosphering_speed: '1000',
    manufacturer: 'Sienar Fleet Systems, Cyngus Spaceworks',
    starship_class: 'landing craft',
    length: '38',
    url: 'http://swapi.dev/api/starships/5/'
  }

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStarshipComponent ],      
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
    fixture = TestBed.createComponent(DeleteStarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    component.data = {starShip: starShipMock};
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should exec delete', () => {
    component.data = {starShip: starShipMock};
    component.ngOnInit();
    expect(component.excDelete).toBeDefined();
  });
});
