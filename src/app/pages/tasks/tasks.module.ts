import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { IsAuthGuard } from 'src/app/shared/guards/is-auth.guard';


const routes: Routes = [
    {
        path: '',
        component: TaskListComponent,
        canActivate: [IsAuthGuard]
    },
    {
        path: ':task_id',
        component: TaskDetailComponent,
        canActivate: [IsAuthGuard]
    },
];

@NgModule({
    declarations: [
        TaskDetailComponent,
        TaskListComponent,
        TaskTableComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class TaskModule { }
