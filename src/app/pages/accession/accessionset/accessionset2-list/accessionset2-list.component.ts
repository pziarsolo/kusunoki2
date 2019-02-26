import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { AccessionsetTableComponent } from 'src/app/shared/components/entity-tables/accessionset-table/accessionset-table.component';

@Component({
  selector: 'kusunoki2-accessionset2-list',
  templateUrl: './accessionset2-list.component.html',
  styleUrls: ['./accessionset2-list.component.scss']
})
export class Accessionset2ListComponent extends TableSearchPageComponent{
    @ViewChild(AccessionsetTableComponent) table: AccessionsetTableComponent;
}