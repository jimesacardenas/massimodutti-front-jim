import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStarshipComponent } from './delete-starship.component';

describe('DeleteStarshipComponent', () => {
  let component: DeleteStarshipComponent;
  let fixture: ComponentFixture<DeleteStarshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStarshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
