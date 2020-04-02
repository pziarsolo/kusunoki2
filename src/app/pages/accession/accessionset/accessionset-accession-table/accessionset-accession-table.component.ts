import { Component, Input, EventEmitter, Output, OnInit, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Accession } from 'src/app/shared/entities/accession.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
    selector: 'kusunoki2-accessionset-accession-table',
    templateUrl: './accessionset-accession-table.component.html',
    styleUrls: ['./accessionset-accession-table.component.scss']
})
export class AccessionSetAccessionTableComponent implements OnInit {
    @Input() accessions;

    @Output() accessionSelected = new EventEmitter<Accession>();
    @Output() accessionAdded = new EventEmitter<Accession>();
    @Output() accessionRemoved = new EventEmitter<Accession>();
    appConfig: AppConfig;
    columnsToDisplay = ['instituteCode', 'germplasmNumber', 'conservationStatus',
                        'is_available', 'add_to_cart'];

    dataSource;

    constructor(public shoppingCartService: ShoppingCartService,
                private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
    }

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<Accession>(this.accessions);
    }
}
