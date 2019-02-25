import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleDetailComponent } from './scale-detail.component';

describe('ScaleDetailComponent', () => {
  let component: ScaleDetailComponent;
  let fixture: ComponentFixture<ScaleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
