import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationSearchFormComponent } from './observation-search-form.component';

describe('ObservationSearchFormComponent', () => {
  let component: ObservationSearchFormComponent;
  let fixture: ComponentFixture<ObservationSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
