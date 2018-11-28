import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePasswordDialogComponent } from './user-change-password-dialog.component';

describe('UserChangePasswordDialogComponent', () => {
  let component: UserChangePasswordDialogComponent;
  let fixture: ComponentFixture<UserChangePasswordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangePasswordDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
