import { Component, Input, SimpleChanges, OnChanges, ViewChildren, AfterViewChecked, QueryList, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUrls } from '../../../appUrls';
import { GooglePieChartComponent } from 'src/app/shared/components/google/google-piechart/google-piechart.component';
import { Observable, Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';

const ALLOWED_RANKS = ['genus', 'species', 'subspecies', 'variety', 'convarietas', 'group', 'forma'];

@Component({
    selector: 'kusunoki2-taxon-stats',
    templateUrl: './taxon-stats.component.html',
    styleUrls: ['./taxon-stats.component.scss']
})
export class TaxonStatsComponent {
    @Input() stats: Observable<any>;
    @Input() initialQueryParams: any = {};
    appConfig: AppConfig;
    showAccessionset: Boolean;

    barcharConfig = {};

    constructor(private appConfigservice: AppConfigService) {
        this.appConfig = this.appConfigservice.getConfig();
        this.showAccessionset = this.appConfig.useAccessionset;
    }
}
