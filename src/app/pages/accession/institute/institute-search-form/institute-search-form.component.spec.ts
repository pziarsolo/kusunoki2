import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteSearchFormComponent } from './institute-search-form.component';

describe('InstituteSearchFormComponent', () => {
  let component: InstituteSearchFormComponent;
  let fixture: ComponentFixture<InstituteSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
