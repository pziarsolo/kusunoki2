import { Component, OnInit } from '@angular/core';

import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { SeedRequest } from 'src/app/pages/seed-requests/entities/seed_request.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';


@Component({
    selector: 'kusunoki2-seed-petition-create',
    templateUrl: './seed-request-create.component.html',
    styleUrls: ['./seed-request-create.component.scss']
})
export class SeedRequestCreateComponent implements OnInit {
    appConfig: AppConfig;
    allInputAreValid: boolean;
    inputsValidStatuses = {};
    request: SeedRequest;
    editMode: boolean;
    createdRequests: SeedRequest[];

    constructor(
        public shoppingCartService: ShoppingCartService,
        private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
    }

    ngOnInit(): void {
        this.request = new SeedRequest();
        this.editMode = true;
    }
}
