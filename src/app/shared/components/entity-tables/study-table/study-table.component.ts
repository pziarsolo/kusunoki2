import { Component, Input} from '@angular/core';
import { SearchDataSourceNoRouter, TableWithFilterComponent } from '../../table-with-filter/table-with-filter.component';
import { Study } from 'src/app/shared/entities/study.model';

class StudyDataSource extends SearchDataSourceNoRouter<Study> {}


@Component({
  selector: 'kusunoki2-study-table',
  templateUrl: './study-table.component.html',
  styleUrls: ['./study-table.component.scss']
})
export class StudyTableComponent extends TableWithFilterComponent {
    entityType = 'study';

    defColumnsToDisplay = ['name', 'description', 'start_date',
                           'end_date', 'contacts'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    createDatasource() {
        this.dataSource = new StudyDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
}
