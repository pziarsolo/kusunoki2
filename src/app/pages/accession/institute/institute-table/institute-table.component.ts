import { Component, Input } from '@angular/core';
import { TableWithFilterComponent, SearchDataSourceNoRouter
} from 'src/app/shared/components/table-with-filter/table-with-filter.component';
import { AppUrls } from 'src/app/pages/appUrls';
import { Institute } from 'src/app/shared/entities/institute.model';

class InstituteDataSource extends SearchDataSourceNoRouter<Institute> {
    mappingFields = {
        'instituteCode': 'code',
        'num_accessions': 'by_num_accessions',
        'num_accessionsets': 'by_num_accessionsets'
    };
}


@Component({
  selector: 'kusunoki2-institute-table',
  templateUrl: './institute-table.component.html',
  styleUrls: ['./institute-table.component.scss']
})
export class InstituteTableComponent extends TableWithFilterComponent {
    entityType = 'institute';
    defColumnsToDisplay = ['instituteCode', 'name', 'num_accessions'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    @Input() extraSearchParams = {};
    appUrls = AppUrls;

    createDatasource() {
        this.dataSource = new InstituteDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
    configureTable() {
        if (this.appConfig.useAccessionset) {
            this.columnsToDisplay = this.columnsToDisplay.concat('num_accessionsets');
        }
    }
}
