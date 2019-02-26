import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitBulkCreateComponent } from './trait-bulk-create.component';

describe('TraitBulkCreateComponent', () => {
  let component: TraitBulkCreateComponent;
  let fixture: ComponentFixture<TraitBulkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitBulkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitBulkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
