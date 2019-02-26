import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppUrls } from '../appUrls';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudyBulkCreateComponent } from './study/study-bulk-create/study-bulk-create.component';
import { StudyDetailComponent } from './study/study-detail/study-detail.component';
import { StudyListComponent } from './study/study-list/study-list.component';
import { ObservationListComponent } from './observation/observation-list/observation-list.component';
import { ObservationBulkCreateComponent } from './observation/observation-bulk-create/observation-bulk-create.component';
import { ObservationVariableDetailComponent
} from './observation_variable/observation-variable-detail/observation-variable-detail.component';
import { TraitDetailComponent } from './trait/trait-detail/trait-detail.component';
import { ScaleDetailComponent } from './scale/scale-detail/scale-detail.component';
import { StudyComponent } from './study/study/study.component';
import { StudySearchFormComponent } from './study/study-search-form/study-search-form.component';
import { InlineAutoTraitComponent } from './trait/inline-auto-trait/inline-auto-trait.component';
import { TraitCreateDialogComponent } from './trait/trait-create-dialog/trait-create-dialog.component';
import { ScaleComponent } from './scale/scale/scale.component';
import { TraitComponent } from './trait/trait/trait.component';
import { ObservationVariableComponent } from './observation_variable/observation-variable/observation-variable.component';
import { ObservationSearchFormComponent } from './observation/observation-search-form/observation-search-form.component';
import { TraitBulkCreateComponent } from './trait/trait-bulk-create/trait-bulk-create.component';


const routes: Routes = [
    {
        path: AppUrls.phenotype.studies + '/bulk_create',
        component: StudyBulkCreateComponent,
    },
    {
        path: AppUrls.phenotype.studies + '/:name',
        component: StudyDetailComponent,
    },
    {
        path: AppUrls.phenotype.studies,
        component: StudyListComponent,
    },
    {
        path: AppUrls.phenotype.observations,
        component: ObservationListComponent,
    },
    {
        path: AppUrls.phenotype.observations + '/bulk_create',
        component: ObservationBulkCreateComponent,
    },
    {
        path: AppUrls.phenotype.observation_variables + '/:name',
        component: ObservationVariableDetailComponent,
    },
    {
        path: AppUrls.phenotype.traits + '/bulk_create',
        component: TraitBulkCreateComponent,
    },
    {
        path: AppUrls.phenotype.traits + '/:name',
        component: TraitDetailComponent,
    },
    {
        path: AppUrls.phenotype.scales + '/:name',
        component: ScaleDetailComponent,
    },


];

@NgModule({
    declarations: [
        StudyBulkCreateComponent,
        StudyDetailComponent,
        StudyComponent,
        ObservationListComponent,
        StudyListComponent,
        ObservationBulkCreateComponent,
        ObservationSearchFormComponent,
        StudySearchFormComponent,
        ObservationVariableDetailComponent,
        ObservationVariableComponent,
        InlineAutoTraitComponent,
        TraitComponent,
        TraitCreateDialogComponent,
        TraitDetailComponent,
        ScaleDetailComponent,
        ScaleComponent,
        TraitBulkCreateComponent,
    ],
    entryComponents: [
        TraitCreateDialogComponent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class PhenotypeModule { }
