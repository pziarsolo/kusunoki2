import { Component, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { AccessionTableComponent } from 'src/app/shared/components/entity-tables/accession-table/accession-table.component';

@Component({
  selector: 'kusunoki2-accession-list',
  templateUrl: './accession-list.component.html',
  styleUrls: ['./accession-list.component.scss']
})
export class AccessionListComponent extends TableSearchPageComponent{
    @ViewChild(AccessionTableComponent) table: AccessionTableComponent;
}
