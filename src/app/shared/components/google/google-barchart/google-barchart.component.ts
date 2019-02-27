/// <reference types="@types/google.visualization" />
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

declare var google: any;

@Component({
    selector: 'kusunoki2-google-barchart',
    templateUrl: './google-barchart.component.html',
    styleUrls: ['./google-barchart.component.scss']
})
export class GoogleBarchartComponent implements OnChanges {
    @Input() div_id: String;
    @Input() chartData: any;
    @Input() config: any;

    constructor() {
        google.charts.load('current', {packages: ['corechart']});
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['chartData'] && this.chartData) {
            this.drawBarChart(this.div_id, this.chartData, this.config);
        }
    }

    drawBarChart(div_id, chartData, config) {
        const chartFunc = () => new google.visualization.ColumnChart(document.getElementById(div_id));
        const  materialOptions = {};
        if (config.headers) {
            chartData = config.headers.concat(chartData);
        }
        materialOptions['hAxis'] = {};
        materialOptions['vAxis'] = {};
        materialOptions['bar'] = {};
        if (config.title) {
            materialOptions['title'] = config.title;
        }
        if (config.ticks) {
            materialOptions['hAxis']['ticks'] = config.ticks;
        }
        if (config.groupWidth) {
            materialOptions['bar']['groupWidth'] = config.groupWidth;
        }
        if (config.htitle) {
            materialOptions['hAxis']['title'] = config.htitle;
        }
        if (config.vtitle) {
            materialOptions['vAxis']['title'] = config.vtitle;
        }
        const func = (_chartFunc, _materialOptions, _chartData) => {
            const datatable = google.visualization.arrayToDataTable(_chartData);
            _chartFunc().draw(datatable, _materialOptions);
        };
        const callback = () => func(chartFunc, materialOptions, chartData);
        google.charts.setOnLoadCallback(callback);
    }
}
