import { Component, OnInit } from '@angular/core';
import { TaxonService } from 'src/app/shared/services/taxon.service';


@Component({
    selector: 'kusunoki2-taxa-stats-page',
    templateUrl: './taxa-stats-page.component.html',
    styleUrls: ['./taxa-stats-page.component.scss']
})
export class TaxaStatsPageComponent implements OnInit {
    stats = {};
    constructor(private taxaStatsService: TaxonService) { }

    ngOnInit() {
        this.taxaStatsService.statsByRank()
            .subscribe(response => {
                this.stats = response;
            });
    }

}
