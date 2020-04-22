import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Observable, of } from 'rxjs';
import { AppUrls } from '../../appUrls';

@Component({
    selector: 'kusunoki2-shopping-cart-menu',
    templateUrl: './shopping-cart-menu.component.html',
    styleUrls: ['./shopping-cart-menu.component.scss']
})
export class ShoppingCartMenuComponent {
    appConfig: AppConfig;
    accessions: Observable<string[]>;
    appUrls = AppUrls;
    constructor(private appConfigService: AppConfigService,
                public shoppingCartService: ShoppingCartService) {
        this.appConfig = this.appConfigService.getConfig();
        this.accessions = this.shoppingCartService.accessions;
    }
}
