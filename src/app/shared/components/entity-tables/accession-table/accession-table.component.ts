import { Component, Input } from '@angular/core';
import { AppUrls } from 'src/app/pages/appUrls';
import { SearchDataSourceNoRouter, TableWithFilterComponent } from '../../table-with-filter/table-with-filter.component';
import { Accession } from 'src/app/shared/entities/accession.model';


class AccessionDataSource extends SearchDataSourceNoRouter<Accession> {}

@Component({
  selector: 'kusunoki2-accession-table',
  templateUrl: './accession-table.component.html',
  styleUrls: ['./accession-table.component.scss']
})
export class AccessionTableComponent extends TableWithFilterComponent {
    entityType = 'accession';
    defColumnsToDisplay = ['instituteCode', 'germplasmNumber', 'countries', 'genera'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    extraSearchParams = {};
    appUrls = AppUrls;

    createDatasource() {
        this.dataSource = new AccessionDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
}
