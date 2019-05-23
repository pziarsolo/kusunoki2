import { Component, OnInit } from '@angular/core';
import { TaxonService } from 'src/app/shared/services/taxon.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { Observable } from 'rxjs';


@Component({
    selector: 'kusunoki2-taxa-stats-page',
    templateUrl: './taxa-stats-page.component.html',
    styleUrls: ['./taxa-stats-page.component.scss']
})
export class TaxaStatsPageComponent implements OnInit {
    stats: Observable<any>;

    constructor(private taxaStatsService: TaxonService) {}

    ngOnInit() {
        this.stats = this.taxaStatsService.statsByRank();
    }
}
