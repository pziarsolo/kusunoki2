import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { AccessionTableComponent } from 'src/app/shared/components/entity-tables/accession-table/accession-table.component';

@Component({
  selector: 'kusunoki2-accession2-list',
  templateUrl: './accession2-list.component.html',
  styleUrls: ['./accession2-list.component.scss']
})
export class Accession2ListComponent extends TableSearchPageComponent{
    @ViewChild(AccessionTableComponent) table: AccessionTableComponent;
}
