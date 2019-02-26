import { Component, Input } from '@angular/core';
import { SearchDataSourceNoRouter, TableWithFilterComponent
} from 'src/app/shared/components/table-with-filter/table-with-filter.component';
import { Task } from 'src/app/shared/entities/task.model';
import { AppUrls } from '../../appUrls';

class TaskDataSource extends SearchDataSourceNoRouter<Task> {}

@Component({
  selector: 'kusunoki2-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent extends TableWithFilterComponent {
    entityType = 'task';
    defColumnsToDisplay = ['task_id', 'status', 'task_name', 'date_done', 'owner'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    columnsToDisplay2 = this.columnsToDisplay.concat('delete');
    extraSearchParams = {};
    appUrls = AppUrls;

    createDatasource() {
        this.dataSource = new TaskDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
    deleteTask(taskId) {
        this.service.delete(taskId)
            .subscribe(
                () => {
                    this.dataSource.loadItems({});
                    this.statusService.info('task log successfully deleted');
                },
                (error) => console.log(error)
            );
    }
}
