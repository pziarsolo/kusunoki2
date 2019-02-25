import { Component } from '@angular/core';
import {
    TableWithFilterComponent, SearchDataSourceNoRouter
} from 'src/app/shared/components/table-with-filter/table-with-filter.component';
import { Observation } from 'src/app/shared/entities/observation.model';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ServiceLocatorService } from 'src/app/shared/services/service-locator.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { AppUrls } from 'src/app/pages/appUrls';


class ObservationDataSource extends SearchDataSourceNoRouter<Observation> {}

@Component({
  selector: 'kusunoki2-observation-table',
  templateUrl: './observation-table.component.html',
  styleUrls: ['./observation-table.component.scss']
})
export class ObservationTableComponent extends TableWithFilterComponent {
    entityType = 'observation';
    columnsToDisplay = ['observation_id', 'study', 'observation_unit',
                        'accession', 'observation_variable', 'value',
                        'creation_time'];
    extraSearchParams = {};
    appUrls = AppUrls;
    constructor(
        currentUserService: CurrentUserService,
        serviceLocator: ServiceLocatorService,
        statusService: StatusService) {
        super(currentUserService, serviceLocator, statusService);
    }

    createDatasource() {
        this.dataSource = new ObservationDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }

}
