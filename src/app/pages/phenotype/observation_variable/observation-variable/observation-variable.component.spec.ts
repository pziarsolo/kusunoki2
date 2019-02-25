import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationVariableComponent } from './observation-variable.component';

describe('ObservationVariableComponent', () => {
  let component: ObservationVariableComponent;
  let fixture: ComponentFixture<ObservationVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
