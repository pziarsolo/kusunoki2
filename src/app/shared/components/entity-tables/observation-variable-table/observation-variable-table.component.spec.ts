import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationVariableTableComponent } from './observation-variable-table.component';

describe('ObservationVariableTableComponent', () => {
  let component: ObservationVariableTableComponent;
  let fixture: ComponentFixture<ObservationVariableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationVariableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationVariableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
