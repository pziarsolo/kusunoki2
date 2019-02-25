import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySearchFormComponent } from './study-search-form.component';

describe('StudySearchFormComponent', () => {
  let component: StudySearchFormComponent;
  let fixture: ComponentFixture<StudySearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
