import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithFilterComponent } from './table-with-filter.component';

describe('TableWithFilterComponent', () => {
  let component: TableWithFilterComponent;
  let fixture: ComponentFixture<TableWithFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWithFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
