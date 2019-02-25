import { Component, OnInit, ViewChild } from '@angular/core';
import { StudyTableComponent } from 'src/app/shared/components/study-table/study-table.component';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';

@Component({
  selector: 'kusunoki2-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.scss']
})
export class StudyListComponent extends TableSearchPageComponent {
    @ViewChild(StudyTableComponent) table: StudyTableComponent;
}
