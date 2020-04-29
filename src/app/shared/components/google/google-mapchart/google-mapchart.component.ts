/// <reference types="@types/google.visualization" />
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

declare var google: any;

@Component({
    selector: 'kusunoki2-google-mapchart',
    templateUrl: './google-mapchart.component.html',
    styleUrls: ['./google-mapchart.component.scss']
})
export class GoogleMapchartComponent implements OnChanges {
    @Input() chartData: any;
    @Input() id: String;
    @Input() statsType: String;

    constructor() {
        google.charts.load('current', { 'packages': ['geochart'] });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['chartData'] && this.chartData) {
            this.drawRegionsMap(this.chartData, this.id, this.statsType);
        }
    }

    prepareGeoData(data, statsType) {
        let header, getter;
        if (statsType === 'accessions') {
            header = 'Num Accessions';
            getter = 'num_accessions';
        } else if (statsType === 'accessionsets') {
            header = 'Num Accessionsets';
            getter = 'num_accessionsets';
        }
        const country_stats = [['Country', header]];
        for (const item of data) {
            const count = item[getter];
            if (count > 0) {
                const country_stat = [item['name'], count];
                country_stats.push(country_stat);
            }
        }
        return country_stats;
    }
    drawRegionsMap(chartData, div_id, statsType) {
        const chartFunc = () => new google.visualization.GeoChart(document.getElementById(div_id));
        const options = {};
        const data = this.prepareGeoData(chartData, statsType);
        const func = (_chartFunc, _options) => {
            const datatable = google.visualization.arrayToDataTable(data);
            _chartFunc().draw(datatable, _options);
        };
        const callback = () => func(chartFunc, options);
        google.charts.setOnLoadCallback(callback);
    }
}
