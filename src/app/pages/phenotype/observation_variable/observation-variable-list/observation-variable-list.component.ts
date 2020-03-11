import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { ObservationVariableTableComponent
} from 'src/app/shared/components/entity-tables/observation-variable-table/observation-variable-table.component';

@Component({
  selector: 'kusunoki2-observation-variable-list',
  templateUrl: './observation-variable-list.component.html',
  styleUrls: ['./observation-variable-list.component.scss']
})
export class ObservationVariableListComponent extends TableSearchPageComponent {
    @ViewChild(ObservationVariableTableComponent) table: ObservationVariableTableComponent;
}
