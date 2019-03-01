import { Component, OnInit, Input } from '@angular/core';
import { TableWithFilterComponent, SearchDataSourceNoRouter } from '../../table-with-filter/table-with-filter.component';
import { ObservationVariable } from 'src/app/shared/entities/onservation_variable.model';

class ObservationVariableDataSource extends SearchDataSourceNoRouter<ObservationVariable> {}

@Component({
  selector: 'kusunoki2-observation-variable-table',
  templateUrl: './observation-variable-table.component.html',
  styleUrls: ['./observation-variable-table.component.scss']
})
export class ObservationVariableTableComponent extends TableWithFilterComponent {
    entityType = 'observation_variable';

    defColumnsToDisplay = ['name', 'description', 'method', 'trait', 'scale'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;

    createDatasource() {

        this.dataSource = new ObservationVariableDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
}
