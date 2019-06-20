import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMultiMarkerComponent } from './generic-multi-marker.component';

describe('GenericMultiMarkerComponent', () => {
  let component: GenericMultiMarkerComponent;
  let fixture: ComponentFixture<GenericMultiMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericMultiMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericMultiMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
