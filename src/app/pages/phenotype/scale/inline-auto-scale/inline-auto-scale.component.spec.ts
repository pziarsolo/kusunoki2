import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineAutoScaleComponent } from './inline-auto-scale.component';

describe('InlineAutoScaleComponent', () => {
  let component: InlineAutoScaleComponent;
  let fixture: ComponentFixture<InlineAutoScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineAutoScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineAutoScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
