import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkCreateComponent } from './bulk-create.component';

describe('BulkCreateComponent', () => {
  let component: BulkCreateComponent;
  let fixture: ComponentFixture<BulkCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
