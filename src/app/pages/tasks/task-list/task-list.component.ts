import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchDataSource, TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { AppUrls } from '../../appUrls';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ServiceLocatorService } from 'src/app/shared/services/service-locator.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { Task } from 'src/app/shared/entities/task.model';


class TaskDataSource extends SearchDataSource<Task> {
    getItemUrl(task) {
        return ['/' + AppUrls.tasks, task.task_id];
    }
}

@Component({
    selector: 'kusunoki2-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends TableListComponent {
    entityType = 'task';
    columnsToDisplay = ['task_id', 'status', 'task_name', 'date_done', 'owner'];
    columnsToDisplay2 = this.columnsToDisplay.concat('delete');
    hasSearchService = false;
    extraSearchParams = {};
    constructor(router: Router,
                route: ActivatedRoute,
                currentUserService: CurrentUserService,
                serviceLocator: ServiceLocatorService,
                statusService: StatusService) {
        super(router, route, currentUserService, serviceLocator, statusService);
    }
    createDatasource() {
        this.dataSource = new TaskDataSource(this.service, this.router,
                                             this.columnsToDisplay,
                                             this.extraSearchParams);
    }
    deleteTask(taskId) {
        this.service.delete(taskId)
            .subscribe(
                () => {
                    this.makeQuery({});
                    this.statusService.info('task log successfully deleted');
                },
                (error) => console.log(error)
            );
    }
    getId(searchItem) {
        return {task_id: searchItem['task_id']};
    }
}
