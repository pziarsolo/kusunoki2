import { Component, Input, SimpleChanges, OnChanges, ViewChildren, AfterViewChecked, QueryList, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AppUrls } from '../../appUrls';
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
export class TaxonStatsComponent implements OnInit, AfterViewChecked {
    @Input() stats: Observable<any>;
    @Input() initialQueryParams: any = {};
    appConfig: AppConfig;
    showAccessionset: Boolean;
    columnsToDisplay = ['taxon_name', 'num_accessions']; //, 'num_accessionsets'];
    appUrls = AppUrls;
    rankStats = {};
    rankStatsBar = {};
    ranksInStats = [];
    barcharConfig = {};

    gettingStats: boolean;

    @ViewChildren(MatSort) sorts = new QueryList<MatSort>();
    @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();
    @ViewChildren(GooglePieChartComponent) pieCharts = new QueryList<GooglePieChartComponent>();

    constructor(private router: Router,
                private appConfigservice: AppConfigService) {
        this.appConfig = this.appConfigservice.getConfig();
        this.showAccessionset = this.appConfig.useAccessionset;
        }

    navigateTo(baseUrl, queryParams) {
        queryParams = {...this.initialQueryParams, ...queryParams};
        this.router.navigate([baseUrl], {queryParams: queryParams});
    }
    ngOnInit(): void {
        if (this.showAccessionset) {
            this.columnsToDisplay = ['taxon_name', 'num_accessions', 'num_accessionsets'];
        }
        this.gettingStats = true;
        this.stats.subscribe(
            (stats) => {
                this.gettingStats = false;
                for (const rank of ALLOWED_RANKS) {
                    if (rank in stats) {
                        this.ranksInStats.push(rank);
                        const statsByRank = [];
                        let statsByRankPie: any[][];
                        if (this.showAccessionset) {
                            statsByRankPie = [['', 'Num. Accessions', 'Num. Accessionsets']];
                        } else {
                            statsByRankPie = [['', 'Num. Accessions']];
                        }

                        for (const taxon_name of Object.keys(stats[rank])) {
                            const taxa_stat = {
                                'taxon_name': taxon_name,
                                'num_accessions': stats[rank][taxon_name]['num_accessions']
                            };
                            if (this.showAccessionset) {
                                taxa_stat['num_accessionsets'] = stats[rank][taxon_name]['num_accessionsets'];
                            }

                            statsByRank.push(taxa_stat);
                        }

                        const sortedStatsByRank: any[][] = statsByRank.sort((obj1, obj2) => {
                            if (obj1.num_accessions > obj2.num_accessions) {
                                return -1;
                            }
                            if (obj2.num_accessions > obj1.num_accessions) {
                                return 1;
                            }
                            return 0;
                        });
                        const sortedStatsByRankPie: any[][] = sortedStatsByRank.map(item => Object.values(item));
                        statsByRankPie = statsByRankPie.concat(sortedStatsByRankPie.slice(0, 9));
                        let sum_accession = 0;
                        let sum_accessionset = 0;
                        sortedStatsByRankPie.slice(9).map(item => {
                            sum_accession += item[1];
                            sum_accessionset += item[2];
                        });
                        if (this.showAccessionset) {
                            statsByRankPie.push(['Other', sum_accession, sum_accessionset]);
                        } else {
                            statsByRankPie.push(['Other', sum_accession]);
                        }

                        this.rankStats[rank] = new MatTableDataSource(sortedStatsByRank);
                        this.rankStatsBar[rank] = {accession: statsByRankPie.map(item => [item[0], item[1]])}
                        if (this.showAccessionset) {
                            this.rankStatsBar[rank].accessionset = statsByRankPie.map(item => [item[0], item[2]]);
                        }
                    }
                }
            },
            (error) => {
                this.gettingStats = false;
            }
        );

    }


    ngAfterViewChecked(): void {
        const paginators = this.paginators.toArray();
        const sorts = this.sorts.toArray();
        if (paginators.length === this.ranksInStats.length) {
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

    tabChanged(event) {
        if (this.showAccessionset) {
            const accessionPieIndex = event.index * 2;
            const accessionSetPieIndex = accessionPieIndex + 1;
            const pies = this.pieCharts.toArray();
            pies[accessionPieIndex].refreshPieChart();
            pies[accessionSetPieIndex].refreshPieChart();
        } else {
            const accessionPieIndex = event.index;
            const pies = this.pieCharts.toArray();
            pies[accessionPieIndex].refreshPieChart();
        }
    }
}
