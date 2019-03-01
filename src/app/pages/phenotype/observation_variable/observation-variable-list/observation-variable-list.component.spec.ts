import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationVariableListComponent } from './observation-variable-list.component';

describe('ObservationVariableListComponent', () => {
  let component: ObservationVariableListComponent;
  let fixture: ComponentFixture<ObservationVariableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationVariableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationVariableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
