import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, ViewChildren, AfterViewChecked, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AppUrls } from '../../appUrls';
import { of, Observable } from 'rxjs';

const ALLOWED_RANKS = ['genus', 'species', 'variety', 'convarietas', 'group', 'forma'];
@Component({
    selector: 'kusunoki2-taxon-stats',
    templateUrl: './taxon-stats.component.html',
    styleUrls: ['./taxon-stats.component.scss']
})
export class TaxonStatsComponent implements OnChanges, AfterViewChecked {
    @Input() stats: any;
    @Input() initialQueryParams: any = {};
    defColumnsToDisplay = ['taxon_name', 'num_accessions', 'num_accessionsets'];
    @Input() ColumnsToDisplay?: String[] = this.defColumnsToDisplay;

    appUrls = AppUrls;
    rankStats = {};
    rankStatsBar = {};
    ranksInStats = [];

    barcharConfig = {};
    @ViewChildren(MatSort) sorts = new QueryList<MatSort>();
    @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();

    constructor(private router: Router) {}

    navigateTo(baseUrl, queryParams) {
        queryParams = {...this.initialQueryParams, ...queryParams};
        this.router.navigate([baseUrl], {queryParams: queryParams});
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['stats'] && this.stats) {
            for (const rank of ALLOWED_RANKS) {
                if (rank in this.stats) {
                    this.ranksInStats.push(rank);
                    const statsByRank = [];
                    const statsByRankBar = [];
                    const barHeaders = ['', 'Num. Accessions', 'Num. Accessionsets'];
                    statsByRankBar.push(barHeaders);

                    for (const taxon_name of Object.keys(this.stats[rank])) {
                        const taxa_stat = {'taxon_name': taxon_name,
                                        'num_accessions': this.stats[rank][taxon_name]['num_accessions'],
                                        'num_accessionsets': this.stats[rank][taxon_name]['num_accessionsets']};

                        statsByRank.push(taxa_stat);
                        const statsBarStat = [taxon_name,
                                            this.stats[rank][taxon_name]['num_accessions'],
                                            this.stats[rank][taxon_name]['num_accessionsets']
                                            ];
                        statsByRankBar.push(statsBarStat);
                    }
                    this.rankStats[rank] = new MatTableDataSource(statsByRank);
                    this.rankStatsBar[rank] = statsByRankBar;
                }
            }

        }
    }
    ngAfterViewChecked(): void {
        const paginators = this.paginators.toArray();
        const sorts = this.sorts.toArray();
        if (paginators.length > 0 && sorts.length > 0) {
            let cont = 0;
            for (const rank of ALLOWED_RANKS) {
                if (this.rankStats[rank] !== undefined) {
                    if (this.rankStats[rank].sort === undefined && sorts[cont]) {
                        this.rankStats[rank].sort = sorts[cont];
                    }
                    if (this.rankStats[rank].paginator === undefined && paginators[cont]) {
                        this.rankStats[rank].paginator = paginators[cont];
                    }
                    cont += 1;
                }
            }
        }
    }
}
