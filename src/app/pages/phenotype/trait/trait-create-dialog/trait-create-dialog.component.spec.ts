import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitCreateDialogComponent } from './trait-create-dialog.component';

describe('TraitCreateDialogComponent', () => {
  let component: TraitCreateDialogComponent;
  let fixture: ComponentFixture<TraitCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
