import { Component, Input } from '@angular/core';
import { AppUrls } from 'src/app/pages/appUrls';
import { SearchDataSourceNoRouter, TableWithFilterComponent } from '../../table-with-filter/table-with-filter.component';
import { AccessionSet } from 'src/app/shared/entities/accessionset.model';

class AccessionSetDataSource extends SearchDataSourceNoRouter<AccessionSet> {}

@Component({
  selector: 'kusunoki2-accessionset-table',
  templateUrl: './accessionset-table.component.html',
  styleUrls: ['./accessionset-table.component.scss']
})
export class AccessionSetTableComponent extends TableWithFilterComponent {
    entityType = 'accessionset';
    defColumnsToDisplay = ['accessionsetNumber', 'countries', 'species'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    extraSearchParams = {};
    appUrls = AppUrls;

    createDatasource() {
        this.dataSource = new AccessionSetDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
}
