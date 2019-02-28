import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleCreateDialogComponent } from './scale-create-dialog.component';

describe('ScaleCreateDialogComponent', () => {
  let component: ScaleCreateDialogComponent;
  let fixture: ComponentFixture<ScaleCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
