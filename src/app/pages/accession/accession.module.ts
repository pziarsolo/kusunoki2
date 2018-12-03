import { NgModule } from '@angular/core';
import { AppUrls } from '../appUrls';
import { IsAdminGuard } from 'src/app/shared/guards/is-admin.guard';
import { Routes, RouterModule } from '@angular/router';
import { InstituteListComponent } from './institute-list/institute-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstituteDetailComponent } from './institute-detail/institute-detail.component';
import { InstituteComponent } from './institute/institute.component';
import { InstituteBulkCreateComponent } from './institute-bulk-create/institute-bulk-create.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { AccessionSearchFormComponent } from './accession-search-form/accession-search-form.component';
import { AccessionListComponent } from './accession-list/accession-list.component';
import { FormsModule } from '@angular/forms';
import { AccessionDetailComponent } from './accession-detail/accession-detail.component';
import { AccessionComponent } from './accession/accession.component';
import { InlineAutoInstituteComponent } from './inline-auto-institute/inline-auto-institute.component';

const routes: Routes = [
    {
        path: AppUrls.institutes + '/bulk_create',
        component: InstituteBulkCreateComponent,
        canActivate: [IsAdminGuard]
    },
    {
        path: AppUrls.institutes,
        component: InstituteListComponent
    },
    {
        path: AppUrls.institutes + '/:instituteCode',
        component: InstituteDetailComponent
    },
    {
        path: AppUrls.countries,
        component: CountryListComponent
    },
    {
        path: AppUrls.countries + '/:code',
        component: CountryDetailComponent
    },
    {
        path: AppUrls.accessions,
        component: AccessionListComponent
    },
    {
        path: AppUrls.accessions + '/:instituteCode/:germplasmNumber',
        component: AccessionDetailComponent
    },
];

@NgModule({
    declarations: [
        InstituteListComponent,
        InstituteDetailComponent,
        InstituteComponent,
        InstituteBulkCreateComponent,
        InlineAutoInstituteComponent,
        CountryListComponent,
        CountryDetailComponent,
        AccessionSearchFormComponent,
        AccessionListComponent,
        AccessionDetailComponent,
        AccessionComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class AccessionModule { }
