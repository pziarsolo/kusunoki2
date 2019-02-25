import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineAutoTraitComponent } from './inline-auto-trait.component';

describe('InlineAutoTraitComponent', () => {
  let component: InlineAutoTraitComponent;
  let fixture: ComponentFixture<InlineAutoTraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineAutoTraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineAutoTraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
