import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Accessionset2ListComponent } from './accessionset-list.component';

describe('Accessionset2ListComponent', () => {
  let component: Accessionset2ListComponent;
  let fixture: ComponentFixture<Accessionset2ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Accessionset2ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Accessionset2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
