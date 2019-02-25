import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitDetailComponent } from './trait-detail.component';

describe('TraitDetailComponent', () => {
  let component: TraitDetailComponent;
  let fixture: ComponentFixture<TraitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
