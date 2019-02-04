import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/entities/task.model';

import { distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kusunoki2-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
    taskId: string;
    task: Task;
    routerSubscription: Subscription;
    reload_time = 1;
    constructor(
        private route: ActivatedRoute,
        private service: TaskService) { }

    ngOnInit() {
        this.routerSubscription = this.route.params.subscribe(params => {
            this.taskId = params.task_id;
            this.service.retrieve(this.taskId)
                // .pipe(
                //     // timer(5000),
                //     takeWhile(x => x.status !== 'FAILURE')
                // )
                .subscribe((task: Task) => {
                    console.log('aa');
                    this.task = task;
                });
        });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
