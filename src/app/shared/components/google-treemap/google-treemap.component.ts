/// <reference types="@types/google.visualization" />
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
// import {} from 'google.visualization';

declare var google: any;
@Component({
  selector: 'kusunoki2-google-treemap',
  templateUrl: './google-treemap.component.html',
  styleUrls: ['./google-treemap.component.scss']
})
export class GoogleTreemapComponent implements OnChanges {
    @Input() chartData: any;
    @Input() id: String;
    @Input() statsType: String;

    constructor() {
        google.charts.load('current', { 'packages': ['treemap'] });
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['chartData'] && this.chartData) {
            this.drawTreeMap(this.chartData, this.id, this.statsType);
        }
    }

    prepareData(chartData, statsType) {
        const data = [['code', 'Parent', `Num. ${statsType}`], ['All', null, 0]];
        for (const inst_data of chartData) {
            data.push([inst_data.instituteCode, 'All', inst_data[`num_${statsType}`]]);
        }
        return data;
    }

    drawTreeMap(chartData, div_id, statsType) {
        const chartFunc = () => new google.visualization.TreeMap(document.getElementById(div_id));
        const options = {
            minColor: '5900ff',
            midColor: '#00ffbb',
            maxColor: '#a6ff00',
            headerHeight: 15,
            fontColor: 'black',
            showScale: true
          }
;
        const data = this.prepareData(chartData, statsType);
        const func = (_chartFunc, _options) => {
            const datatable = google.visualization.arrayToDataTable(data);
            _chartFunc().draw(datatable, _options);
        };
        const callback = () => func(chartFunc, options);
        google.charts.setOnLoadCallback(callback);
    }

}
