import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditListComponent } from './inline-edit-list.component';

describe('InlineEditListComponent', () => {
  let component: InlineEditListComponent;
  let fixture: ComponentFixture<InlineEditListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineEditListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
