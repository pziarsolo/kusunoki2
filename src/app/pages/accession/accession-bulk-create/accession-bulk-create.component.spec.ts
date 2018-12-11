import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessionBulkCreateComponent } from './accession-bulk-create.component';

describe('AccessionBulkCreateComponent', () => {
  let component: AccessionBulkCreateComponent;
  let fixture: ComponentFixture<AccessionBulkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessionBulkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessionBulkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
