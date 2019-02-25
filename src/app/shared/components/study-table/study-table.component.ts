import { Component, OnInit } from '@angular/core';
import { SearchDataSourceNoRouter, TableWithFilterComponent } from '../table-with-filter/table-with-filter.component';
import { Study } from '../../entities/study.model';
import { StatusService } from '../../StatusModule/status.service';
import { ServiceLocatorService } from '../../services/service-locator.service';
import { CurrentUserService } from '../../services/current-user.service';

class StudyDataSource extends SearchDataSourceNoRouter<Study> {}


@Component({
  selector: 'kusunoki2-study-table',
  templateUrl: './study-table.component.html',
  styleUrls: ['./study-table.component.scss']
})
export class StudyTableComponent extends TableWithFilterComponent {
    entityType = 'study';
    columnsToDisplay = ['name', 'description', 'start_date',
                        'end_date', 'active', 'contacts'];

    createDatasource() {
        this.dataSource = new StudyDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
}
