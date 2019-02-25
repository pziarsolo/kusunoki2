import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationVariableDetailComponent } from './observation-variable-detail.component';

describe('ObservationVariableDetailComponent', () => {
  let component: ObservationVariableDetailComponent;
  let fixture: ComponentFixture<ObservationVariableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationVariableDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationVariableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
