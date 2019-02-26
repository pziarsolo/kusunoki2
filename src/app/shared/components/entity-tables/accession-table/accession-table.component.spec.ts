import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessionTableComponent } from './accession-table.component';

describe('AccessionTableComponent', () => {
  let component: AccessionTableComponent;
  let fixture: ComponentFixture<AccessionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
