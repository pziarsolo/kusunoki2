import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyMultiAutocompleteComponent } from './study-multi-autocomplete.component';

describe('StudyMultiAutocompleteComponent', () => {
  let component: StudyMultiAutocompleteComponent;
  let fixture: ComponentFixture<StudyMultiAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyMultiAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyMultiAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
