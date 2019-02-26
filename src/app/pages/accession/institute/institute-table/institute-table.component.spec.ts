import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteTableComponent } from './institute-table.component';

describe('InstituteTableComponent', () => {
  let component: InstituteTableComponent;
  let fixture: ComponentFixture<InstituteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
