import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartMenuComponent } from './shopping-cart-menu.component';

describe('ShoppingCartMenuComponent', () => {
  let component: ShoppingCartMenuComponent;
  let fixture: ComponentFixture<ShoppingCartMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
