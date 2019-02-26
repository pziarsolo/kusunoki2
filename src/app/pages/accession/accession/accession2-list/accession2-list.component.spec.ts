import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Accession2ListComponent } from './accession2-list.component';

describe('Accession2ListComponent', () => {
  let component: Accession2ListComponent;
  let fixture: ComponentFixture<Accession2ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Accession2ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Accession2ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
