import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMapComponent } from './generic-map.component';

describe('GenericMapComponent', () => {
  let component: GenericMapComponent;
  let fixture: ComponentFixture<GenericMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
