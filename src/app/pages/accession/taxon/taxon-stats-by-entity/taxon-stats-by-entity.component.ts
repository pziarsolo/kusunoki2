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
import { Stats } from 'fs';

const ALLOWED_RANKS = ['genus', 'species', 'subspecies', 'variety', 'convarietas', 'group', 'forma'];

@Component({
  selector: 'kusunoki2-taxon-stats-by-entity',
  templateUrl: './taxon-stats-by-entity.component.html',
  styleUrls: ['./taxon-stats-by-entity.component.scss']
})
export class TaxonStatsByEntityComponent implements OnInit,  AfterViewChecked {
    rankStats;
    rankStatsBar;
    ranksInStats = [];
    @Input() stats;
    @Input() entityType;
    @Input() initialQueryParams: any = {};
    first = true;
    entity_in_title: string;
    appUrls = AppUrls;
    columnsToDisplay = ['taxon_name', 'counts'];
    gettingStats: boolean;

    @ViewChildren(MatSort) sorts = new QueryList<MatSort>();
    @ViewChildren(MatPaginator) paginators = new QueryList<MatPaginator>();
    @ViewChildren(GooglePieChartComponent) pieCharts = new QueryList<GooglePieChartComponent>();

    constructor(private router: Router) { }

    navigateTo(baseUrl, queryParams) {
        queryParams = {...this.initialQueryParams, ...queryParams};
        this.router.navigate([baseUrl], {queryParams: queryParams});
    }

    ngOnInit(): void {
        this.gettingStats = true;
        this.stats.subscribe(
            (stats) => {
                const _stats = this.processStats(stats, this.entityType);
                this.gettingStats = false;
                this.rankStats = _stats.stats;
                this.rankStatsBar = _stats.by_bar;
                this.ranksInStats = _stats.used_ranks;
            }
        );
        this.entity_in_title = this.entityType;
        if (this.entityType === 'accessionset') {
            this.entity_in_title = 'accession set';
        }
    }
    processStats(stats, type) {
        const rankStats = {};
        const rankStatsBar = {};
        const ranksInStats = [];
        for (const rank of ALLOWED_RANKS) {
            if (Object.keys(stats).indexOf(rank) > -1) {
                ranksInStats.push(rank);
                const statsByRank = [];
                let statsByRankPie: any[][];
                let accessor: string;
                if (type === 'accession') {
                    statsByRankPie = [['', 'Num. Accessions']];
                    accessor = 'num_accessions';
                } else if (type === 'accessionset') {
                    statsByRankPie = [['', 'Num. Accessionsets']];
                    accessor = 'num_accessionsets';
                }

                for (const taxon_name of Object.keys(stats[rank])) {
                    const taxa_stat = {
                        'taxon_name': taxon_name,
                        'counts': stats[rank][taxon_name][accessor]
                    };
                    statsByRank.push(taxa_stat);
                }

                const sortedStatsByRank: any[][] = statsByRank.sort((obj1, obj2) => {
                    if (obj1.counts > obj2.counts) {
                        return -1;
                    }
                    if (obj2.counts > obj1.counts) {
                        return 1;
                    }
                    return 0;
                });

                const sortedStatsByRankPie: any[][] = sortedStatsByRank.map(item => Object.values(item));
                statsByRankPie = statsByRankPie.concat(sortedStatsByRankPie.slice(0, 9));
                let sum_accession = 0;
                sortedStatsByRankPie.slice(9).map(item => {
                    sum_accession += item[1];
                });

                statsByRankPie.push(['Other', sum_accession]);
                rankStats[rank] = new MatTableDataSource(sortedStatsByRank);
                rankStatsBar[rank] = {sums: statsByRankPie.map(item => [item[0], item[1]])};
            }
        }
        return {'stats': rankStats, 'by_bar': rankStatsBar, 'used_ranks': ranksInStats};
    }

    ngAfterViewChecked(): void {
        const paginators = this.paginators.toArray();
        const sorts = this.sorts.toArray();
        if (this.first && this.pieCharts.length > 0 )  {
            this.pieCharts.toArray()[0].refreshPieChart();
            this.first = false;
        }
        if (this.ranksInStats.length > 0 &&
            paginators.length === this.ranksInStats.length) {
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
        const PieIndex = event.index;
        const pies = this.pieCharts.toArray();
        pies[PieIndex].refreshPieChart();
    }

}
