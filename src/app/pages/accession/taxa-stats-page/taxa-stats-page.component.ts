import { Component, OnInit } from '@angular/core';
import { TaxonService } from 'src/app/shared/services/taxon.service';


@Component({
    selector: 'kusunoki2-taxa-stats-page',
    templateUrl: './taxa-stats-page.component.html',
    styleUrls: ['./taxa-stats-page.component.scss']
})
export class TaxaStatsPageComponent implements OnInit {
    stats = {};
    statsCalculating: boolean;
    constructor(private taxaStatsService: TaxonService) { }

    ngOnInit() {
        this.statsCalculating = true;
        this.taxaStatsService.statsByRank()
            .subscribe(response => {
                this.stats = response;
                this.statsCalculating = false;
            });
    }

}
