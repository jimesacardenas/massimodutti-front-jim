import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditStarshipComponent } from './create-edit-starship.component';

describe('CreateEditShipComponent', () => {
  let component: CreateEditStarshipComponent;
  let fixture: ComponentFixture<CreateEditStarshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditStarshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditStarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
