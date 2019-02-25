import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTableComponent } from './study-table.component';

describe('StudyTableComponent', () => {
  let component: StudyTableComponent;
  let fixture: ComponentFixture<StudyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
