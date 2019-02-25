import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearchPageComponent } from './table-search-page.component';

describe('TableSearchPageComponent', () => {
  let component: TableSearchPageComponent;
  let fixture: ComponentFixture<TableSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
