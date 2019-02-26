import { Component, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { CountryTableComponent } from '../country-table/country-table.component';

@Component({
    selector: 'kusunoki2-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent extends TableSearchPageComponent {
    @ViewChild(CountryTableComponent) table: CountryTableComponent;
}
