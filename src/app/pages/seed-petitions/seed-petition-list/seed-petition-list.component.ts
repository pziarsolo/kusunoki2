import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { SeedPetitionTableComponent } from '../seed-petition-table/seed-petition-table.component';

@Component({
  selector: 'kusunoki2-seed-petition-list',
  templateUrl: './seed-petition-list.component.html',
  styleUrls: ['./seed-petition-list.component.scss']
})
export class SeedPetitionListComponent extends TableSearchPageComponent {
    @ViewChild(SeedPetitionTableComponent) table: SeedPetitionTableComponent;
}
