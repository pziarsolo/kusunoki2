import { Component, ViewChild } from '@angular/core';

import { ObservationTableComponent } from 'src/app/shared/components/entity-tables/observation-table/observation-table.component';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';


@Component({
    selector: 'kusunoki2-observation-list',
    templateUrl: './observation-list.component.html',
    styleUrls: ['./observation-list.component.scss']
})
export class ObservationListComponent extends TableSearchPageComponent {
    @ViewChild(ObservationTableComponent, {static: false}) table: ObservationTableComponent;
}
