import { NgModule } from '@angular/core';
import { AppUrls } from '../appUrls';
import { IsAdminGuard } from 'src/app/shared/guards/is-admin.guard';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PassportComponent } from './passport/passport.component';
import { TaxaStatsPageComponent } from './taxon/taxa-stats-page/taxa-stats-page.component';
import { OtherNumbersComponent } from './passport-other-numbers/other-numbers.component';
import { OtherNumberComponent } from './passport-other-numbers/other-number.component';
import { AccessionSearchFormComponent, AccessionSearchByObservationFormComponent, AccessionSearchByObservationsFormComponent
} from './accession/accession-search-form/accession-search-form.component';
import { AccessionListComponent } from './accession/accession-list/accession-list.component';
import { AccessionDetailComponent } from './accession/accession-detail/accession-detail.component';
import { AccessionCreateComponent } from './accession/accession-create/accession-create.component';
import { AccessionBulkCreateComponent } from './accession/accession-bulk-create/accession-bulk-create.component';
import { AccessionComponent } from './accession/accession/accession.component';
import { InstituteListComponent } from './institute/institute-list/institute-list.component';
import { InstituteDetailComponent } from './institute/institute-detail/institute-detail.component';
import { InstituteComponent } from './institute/institute/institute.component';
import { InstituteBulkCreateComponent } from './institute/institute-bulk-create/institute-bulk-create.component';
import { InlineAutoInstituteComponent } from './institute/inline-auto-institute/inline-auto-institute.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { CountryDetailComponent } from './country/country-detail/country-detail.component';
import { InlineAutoCountryComponent } from './country/inline-auto-country/inline-auto-country.component';
import { AccessionSetBulkCreateComponent } from './accessionset/accessionset-bulk-create/accessionset-bulk-create.component';
import { AccessionSetSearchFormComponent } from './accessionset/accessionset-search-form/accessionset-search-form.component';
import { AccessionSetListComponent } from './accessionset/accessionset-list/accessionset-list.component';
import { AccessionSetDetailComponent } from './accessionset/accessionset-detail/accessionset-detail.component';
import { AccessionSetComponent } from './accessionset/accessionset/accessionset.component';
import { AccessionSetAccessionTableComponent } from './accessionset/accessionset-accession-table/accessionset-accession-table.component';
import { TaxonStatsComponent } from './taxon/taxon-stats/taxon-stats.component';
import { CountryStatsTableComponent } from './country/country-stats-table/country-stats-table.component';
import { CountryTableComponent } from './country/country-table/country-table.component';
import { InstituteStatsTableComponent } from './institute/institute-stats-table/institute-stats-table.component';
import { InstituteTableComponent } from './institute/institute-table/institute-table.component';
import { AccessionMultiMarkerMapComponent } from './accession/accession-multi-marker-map/accession-multi-marker-map.component';
import { AccessionsetMultiMarkerMapComponent } from './accessionset/accessionset-multi-marker-map/accessionset-multi-marker-map.component';
import { TaxonStatsByEntityComponent } from './taxon/taxon-stats-by-entity/taxon-stats-by-entity.component';

const routes: Routes = [
    {
        path: AppUrls.institutes + '/bulk_create',
        component: InstituteBulkCreateComponent,
        canActivate: [IsAdminGuard],
        data: {title: 'Create institutes in Bulk'}
    },
    {
        path: AppUrls.institutes,
        component: InstituteListComponent,
        data: {title: 'Institutes'}
    },
    {
        path: AppUrls.institutes + '/:instituteCode',
        component: InstituteDetailComponent
    },
    {
        path: AppUrls.countries,
        component: CountryListComponent,
        data: {title: 'Countries'}

    },
    {
        path: AppUrls.countries + '/:code',
        component: CountryDetailComponent
    },
    {
        path: AppUrls.accessions,
        component: AccessionListComponent,
        data: {title: 'Accessions'}
    },
    {
        path: AppUrls.accessions + '/create',
        component: AccessionCreateComponent,
        data: {title: 'Create New Accession'}
    },
    {
        path: AppUrls.accessions + '/bulk_create',
        component: AccessionBulkCreateComponent,
        data: {title: 'Create Accessions in Bulk'}
    },
    {
        path: AppUrls.accessions + '/:instituteCode/:germplasmNumber',
        component: AccessionDetailComponent
    },
    {
        path: AppUrls.accessionsets,
        component: AccessionSetListComponent,
        data: {title: 'AccessionSets'}
    },
    {
        path: AppUrls.accessionsets + '/bulk_create',
        component: AccessionSetBulkCreateComponent,
        data: {title: 'Create AccessionSets in Bulk'}
    },
    {
        path: AppUrls.accessionsets + '/:accessionsetNumber',
        component: AccessionSetDetailComponent
    },
    {
        path: AppUrls.taxonomy_stats,
        component: TaxaStatsPageComponent,
        data: {title: 'Taxonomy stats'}
    },

];

@NgModule({
    declarations: [
        AccessionSearchByObservationsFormComponent,
        AccessionSearchByObservationFormComponent,
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
        CountryStatsTableComponent,
        InstituteStatsTableComponent,
        TaxonStatsComponent,
        TaxaStatsPageComponent,
        OtherNumberComponent,
        OtherNumbersComponent,
        CountryTableComponent,
        InstituteTableComponent,
        AccessionMultiMarkerMapComponent,
        AccessionsetMultiMarkerMapComponent,
        TaxonStatsByEntityComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class AccessionModule { }
