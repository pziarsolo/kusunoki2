import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessionsetTableComponent } from './accessionset-table.component';

describe('AccessionsetTableComponent', () => {
  let component: AccessionsetTableComponent;
  let fixture: ComponentFixture<AccessionsetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessionsetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessionsetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
