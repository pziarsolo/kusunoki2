import { Component, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { StudyTableComponent } from 'src/app/shared/components/entity-tables/study-table/study-table.component';

@Component({
  selector: 'kusunoki2-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.scss']
})
export class StudyListComponent extends TableSearchPageComponent {
    @ViewChild(StudyTableComponent) table: StudyTableComponent;
}
