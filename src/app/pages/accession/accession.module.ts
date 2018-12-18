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
import { PassportComponent } from './passport/passport.component';
import { InlineAutoCountryComponent } from './inline-auto-country/inline-auto-country.component';
import { AccessionCreateComponent } from './accession-create/accession-create.component';
import { AccessionBulkCreateComponent } from './accession-bulk-create/accession-bulk-create.component';
import { AccessionSetBulkCreateComponent } from './accessionset-bulk-create/accessionset-bulk-create.component';
import { AccessionSetSearchFormComponent } from './accessionset-search-form/accessionset-search-form.component';
import { AccessionSetListComponent } from './accessionset-list/accessionset-list.component';
import { AccessionSetDetailComponent } from './accessionset-detail/accessionset-detail.component';
import { AccessionSetComponent } from './accessionset/accessionset.component';
import { AccessionSetAccessionTableComponent } from './accessoinset-accession-table/accessionset-accession-table.component';
import { CountryTableComponent } from './country-table/country-table.component';
import { TaxonStatsComponent } from './taxon-stats/taxon-stats.component';
import { InstituteTableComponent } from './institute-table/institute-table.component';

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
        path: AppUrls.accessions + '/create',
        component: AccessionCreateComponent
    },
    {
        path: AppUrls.accessions + '/bulk_create',
        component: AccessionBulkCreateComponent
    },
    {
        path: AppUrls.accessions + '/:instituteCode/:germplasmNumber',
        component: AccessionDetailComponent
    },
    {
        path: AppUrls.accessionsets,
        component: AccessionSetListComponent
    },
    {
        path: AppUrls.accessionsets + '/bulk_create',
        component: AccessionSetBulkCreateComponent
    },
    {
        path: AppUrls.accessionsets + '/:accessionsetNumber',
        component: AccessionSetDetailComponent
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
        InlineAutoCountryComponent,
        AccessionSearchFormComponent,
        AccessionListComponent,
        AccessionDetailComponent,
        AccessionCreateComponent,
        AccessionBulkCreateComponent,
        AccessionComponent,
        PassportComponent,
        AccessionSetBulkCreateComponent,
        AccessionSetSearchFormComponent,
        AccessionSetListComponent,
        AccessionSetDetailComponent,
        AccessionSetComponent,
        AccessionSetAccessionTableComponent,
        CountryTableComponent,
        InstituteTableComponent,
        TaxonStatsComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class AccessionModule { }
