import { Component, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { AccessionSetTableComponent } from 'src/app/shared/components/entity-tables/accessionset-table/accessionset-table.component';

@Component({
  selector: 'kusunoki2-accessionset-list',
  templateUrl: './accessionset-list.component.html',
  styleUrls: ['./accessionset-list.component.scss']
})
export class AccessionSetListComponent extends TableSearchPageComponent {
    @ViewChild(AccessionSetTableComponent) table: AccessionSetTableComponent;
}
