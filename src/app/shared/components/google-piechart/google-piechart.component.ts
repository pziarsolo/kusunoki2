/// <reference types="@types/google.visualization" />
import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterViewChecked, AfterViewInit } from '@angular/core';

declare var google: any;

@Component({
    selector: 'kusunoki2-google-piechart',
    templateUrl: './google-piechart.component.html',
    styleUrls: ['./google-piechart.component.scss']
})
export class GooglePieChartComponent implements OnChanges {
    @Input() div_id: string;
    @Input() chartData: any;
    @Input() config: any;

    constructor() {
        google.charts.load('current', {packages: ['corechart']});
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['chartData'] && this.chartData && this.div_id) {
            this.drawPieChart(this.div_id, this.chartData, this.config);
        }
    }
    refreshPieChart(): void {
        this.drawPieChart(this.div_id, this.chartData, this.config);
    }
    drawPieChart(div_id, chartData, config) {
        const element = document.getElementById(div_id)
        if (element) {
            const chartFunc = () => new google.visualization.PieChart(element);
            const func = (_chartFunc, _config, _chartData) => {
                const datatable = google.visualization.arrayToDataTable(_chartData);
                _chartFunc().draw(datatable, _config);
            };
            const callback = () => func(chartFunc, config, chartData);
            google.charts.setOnLoadCallback(callback);
        }
    }
}
