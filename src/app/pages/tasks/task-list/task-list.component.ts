import { Component, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { TaskTableComponent } from '../task-table/task-table.component';


@Component({
    selector: 'kusunoki2-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends TableSearchPageComponent {
    @ViewChild(TaskTableComponent) table: TaskTableComponent;
}
