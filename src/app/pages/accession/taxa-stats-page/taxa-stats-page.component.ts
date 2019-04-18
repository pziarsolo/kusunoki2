import { Component, OnInit } from '@angular/core';
import { TaxonService } from 'src/app/shared/services/taxon.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';


@Component({
    selector: 'kusunoki2-taxa-stats-page',
    templateUrl: './taxa-stats-page.component.html',
    styleUrls: ['./taxa-stats-page.component.scss']
})
export class TaxaStatsPageComponent implements OnInit {
    stats = {};
    statsCalculating: boolean;
    appConfig: AppConfig;
    constructor(private taxaStatsService: TaxonService,
        private appConfigService: AppConfigService) {
            this.appConfig = this.appConfigService.getConfig();
         }

    ngOnInit() {
        this.statsCalculating = true;
        this.taxaStatsService.statsByRank()
            .subscribe(response => {
                this.stats = response;
                this.statsCalculating = false;
            });
    }

}
