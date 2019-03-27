import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationImageGalleryComponent } from './observation-image-gallery.component';

describe('ObservationImageGalleryComponent', () => {
  let component: ObservationImageGalleryComponent;
  let fixture: ComponentFixture<ObservationImageGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationImageGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
