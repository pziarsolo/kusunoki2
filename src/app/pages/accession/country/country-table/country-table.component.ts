import { Component, OnInit, Input } from '@angular/core';
import { SearchDataSourceNoRouter, TableWithFilterComponent
} from 'src/app/shared/components/table-with-filter/table-with-filter.component';
import { Country } from 'src/app/shared/entities/country.model';
import { AppUrls } from 'src/app/pages/appUrls';

class CountryDataSource extends SearchDataSourceNoRouter<Country> {
    mappingFields = {
        'num_accessions': 'by_num_accessions',
        'num_accessionsets': 'by_num_accessionsets'
    };
}

@Component({
  selector: 'kusunoki2-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent extends TableWithFilterComponent {
    entityType = 'country';
    defColumnsToDisplay = ['code', 'name', 'num_accessions', 'num_accessionsets'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    extraSearchParams = {'only_with_accessions': true};
    appUrls = AppUrls;

    createDatasource() {
        this.dataSource = new CountryDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
}
