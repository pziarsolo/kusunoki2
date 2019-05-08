import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessionMultiMarkerMapComponent } from './accession-multi-marker-map.component';

describe('AccessionMultiMarkerMapComponent', () => {
  let component: AccessionMultiMarkerMapComponent;
  let fixture: ComponentFixture<AccessionMultiMarkerMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessionMultiMarkerMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessionMultiMarkerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
