import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineScaleValidValuesComponent } from './inline-scale-valid-values.component';

describe('InlineScaleValidValuesComponent', () => {
  let component: InlineScaleValidValuesComponent;
  let fixture: ComponentFixture<InlineScaleValidValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineScaleValidValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineScaleValidValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
