import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SeedPetitionListComponent } from './seed-petition-list/seed-petition-list.component';
import { SeedPetitionCreateComponent } from './seed-petition-create/seed-petition-create.component';
import { SeedPetitionDetailComponent } from './seed-petition-detail/seed-petition-detail.component';
import { AccessionModule } from '../accession/accession.module';
import { IsAdminGuard } from 'src/app/shared/guards/is-admin.guard';
import { SeedPetitionTableComponent } from './seed-petition-table/seed-petition-table.component';
import { SeedPetitionComponent } from './seed-petition/seed-petition.component';

const routes: Routes = [
    {
        path: '',
        component: SeedPetitionListComponent,
        canActivate: [IsAdminGuard]
    },
    {
        path: 'create',
        component: SeedPetitionCreateComponent
    },
    {
        path: ':petition_uid',
        component: SeedPetitionDetailComponent,
        canActivate: [IsAdminGuard]
    },
];

@NgModule({
    declarations: [SeedPetitionListComponent,
        SeedPetitionCreateComponent,
        SeedPetitionDetailComponent,
        SeedPetitionTableComponent,
        SeedPetitionComponent],
    imports: [
        SharedModule,
        AccessionModule,
        RouterModule.forChild(routes),
  ]
})
export class SeedPetitionModule { }
