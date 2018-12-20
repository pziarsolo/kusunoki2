/// <reference types="@types/google.visualization" />
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

declare var google: any;

@Component({
    selector: 'kusunoki2-google-piechart',
    templateUrl: './google-piechart.component.html',
    styleUrls: ['./google-piechart.component.scss']
})
export class GooglePieChartComponent implements OnChanges {
    @Input() div_id: String;
    @Input() chartData: any;
    @Input() config: any;

    constructor() {
        google.charts.load('current', {packages: ['corechart']});
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['chartData'] && this.chartData) {
            this.drawPieChart(this.div_id, this.chartData, this.config);
        }
    }

    drawPieChart(div_id, chartData, config) {
        const chartFunc = () => new google.visualization.PieChart(document.getElementById(div_id));
        const  materialOptions = config;

        // if (config.headers) {
        //     chartData = config.headers.concat(chartData);
        // }
        // materialOptions['hAxis'] = {};
        // materialOptions['vAxis'] = {};
        // materialOptions['bar'] = {};
        // if (config.title) {
        //     materialOptions['title'] = config.title;
        // }
        // if (config.ticks) {
        //     materialOptions['hAxis']['ticks'] = config.ticks;
        // }
        // if (config.groupWidth) {
        //     materialOptions['bar']['groupWidth'] = config.groupWidth;
        // }
        // if (config.htitle) {
        //     materialOptions['hAxis']['title'] = config.htitle;
        // }
        // if (config.vtitle) {
        //     materialOptions['vAxis']['title'] = config.vtitle;
        // }
        const func = (_chartFunc, _materialOptions, _chartData) => {
            const datatable = google.visualization.arrayToDataTable(_chartData);
            _chartFunc().draw(datatable, _materialOptions);
        };
        const callback = () => func(chartFunc, materialOptions, chartData);
        google.charts.setOnLoadCallback(callback);
    }
}
