import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/entities/task.model';

import { distinctUntilChanged, takeWhile, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'kusunoki2-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
    taskId: string;
    task: Task;
    routerSubscription: Subscription;
    poolingSubscription: Subscription;
    reload_time = 5;
    constructor(
        private route: ActivatedRoute,
        private service: TaskService) { }

    ngOnInit() {
        this.routerSubscription = this.route.params.subscribe(params => {
            this.taskId = params.task_id;
            const source = interval(this.reload_time * 1000)
                .pipe(
                    startWith(0),
                    switchMap(() => this.service.retrieve(this.taskId)),
                );
            this.poolingSubscription = source
                .subscribe((task: Task) => {
                    this.task = task;
                    if (task.status !== 'PENDING') {
                        this.poolingSubscription.unsubscribe();
                    }
                });
        });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
        this.poolingSubscription.unsubscribe();
    }
}
