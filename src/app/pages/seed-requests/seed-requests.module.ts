import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { AccessionModule } from '../accession/accession.module';

import { SeedRequestListComponent } from './seed-request-list/seed-request-list.component';
import { SeedRequestCreateComponent } from './seed-request-create/seed-request-create.component';
import { SeedRequestDetailComponent } from './seed-request-detail/seed-request-detail.component';
import { IsAdminGuard } from 'src/app/shared/guards/is-admin.guard';
import { SeedRequestTableComponent } from './seed-request-table/seed-request-table.component';
import { SeedRequestComponent } from './seed-request/seed-request.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: SeedRequestListComponent,
        canActivate: [IsAdminGuard]
    },
    {
        path: 'create',
        component: SeedRequestCreateComponent
    },
    {
        path: ':request_uid',
        component: SeedRequestDetailComponent,
        canActivate: [IsAdminGuard]
    },
];

@NgModule({
    declarations: [
        SeedRequestListComponent,
        SeedRequestCreateComponent,
        SeedRequestDetailComponent,
        SeedRequestTableComponent,
        SeedRequestComponent],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        AccessionModule,
        RouterModule.forChild(routes),
  ]
})
export class SeedRequestModule { }
