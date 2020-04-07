import { Component, ViewChild } from '@angular/core';

import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { SeedRequestTableComponent } from '../seed-request-table/seed-request-table.component';

@Component({
  selector: 'kusunoki2-seed-request-list',
  templateUrl: './seed-request-list.component.html',
  styleUrls: ['./seed-request-list.component.scss']
})
export class SeedRequestListComponent extends TableSearchPageComponent {
    @ViewChild(SeedRequestTableComponent) table: SeedRequestTableComponent;
}
