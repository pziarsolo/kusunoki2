import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsIframeComponent } from './publications-iframe.component';

describe('PublicationsIframeComponent', () => {
  let component: PublicationsIframeComponent;
  let fixture: ComponentFixture<PublicationsIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationsIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
