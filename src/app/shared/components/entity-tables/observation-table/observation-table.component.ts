import { Component, Input } from '@angular/core';
import { TableWithFilterComponent, SearchDataSourceNoRouter
} from 'src/app/shared/components/table-with-filter/table-with-filter.component';
import { Observation } from 'src/app/shared/entities/observation.model';
import { AppUrls } from 'src/app/pages/appUrls';


class ObservationDataSource extends SearchDataSourceNoRouter<Observation> {
    mappingFields = {
        study: 'observation_unit__study__name',
        observation_unit: 'observation_unit__name',
        accession: 'observation_unit__accession__germplasm_number',
        value_beauty: 'value',
        observation_variable: 'observation_variable__name'
    };
}


@Component({
  selector: 'kusunoki2-observation-table',
  templateUrl: './observation-table.component.html',
  styleUrls: ['./observation-table.component.scss']
})
export class ObservationTableComponent extends TableWithFilterComponent {
    entityType = 'observation';
    defColumnsToDisplay = ['observation_id', 'study', 'observation_unit',
                           'accession', 'observation_variable', 'value_beauty',
                           'creation_time'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    extraSearchParams = {};
    appUrls = AppUrls;

    createDatasource() {
        this.dataSource = new ObservationDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
}
