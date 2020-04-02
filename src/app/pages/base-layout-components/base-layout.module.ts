import { NgModule } from '@angular/core';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
// import { UserMenuComponent } from './user-menu/user-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
// import { StatusModule } from '../../shared/status/status.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ShoppingCartMenuComponent } from './shopping-cart-menu/shopping-cart-menu.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  declarations: [
      BaseLayoutComponent,
      HeaderComponent,
      FooterComponent,
      UserMenuComponent,
      ShoppingCartMenuComponent
  ],
  exports: [
      BaseLayoutComponent,
      HeaderComponent,
      FooterComponent,
      UserMenuComponent,
      ShoppingCartMenuComponent
  ]
})
export class BaseLayoutModule { }
