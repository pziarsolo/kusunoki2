import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessionsetMultiMarkerMapComponent } from './accessionset-multi-marker-map.component';

describe('AccessionsetMultiMarkerMapComponent', () => {
  let component: AccessionsetMultiMarkerMapComponent;
  let fixture: ComponentFixture<AccessionsetMultiMarkerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessionsetMultiMarkerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessionsetMultiMarkerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
