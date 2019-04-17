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
import { InlineAutoScaleComponent } from './scale/inline-auto-scale/inline-auto-scale.component';
import { ScaleCreateDialogComponent } from './scale/scale-create-dialog/scale-create-dialog.component';
import { ObservationVariableListComponent } from './observation_variable/observation-variable-list/observation-variable-list.component';
import { InlineScaleValidValuesComponent } from './scale/inline-scale-valid-values/inline-scale-valid-values.component';
import { ObservationImageBulkCreateComponent
} from './observation_image/observation-image-bulk-create/observation-image-bulk-create.component';
import { StudyMultiAutocompleteComponent } from './study/study-multi-autocomplete/study-multi-autocomplete.component';
import { ObservationVariableMultiAutocompleteComponent
} from './observation_variable/observation_variable-multi-autocomplete/observation-variable-multi-autocomplete.component';


const routes: Routes = [
    {
        path: AppUrls.phenotype.studies + '/bulk_create',
        component: StudyBulkCreateComponent,
        data: {title: 'Create New studies in bulk'}
    },
    {
        path: AppUrls.phenotype.studies + '/:name',
        component: StudyDetailComponent,
    },
    {
        path: AppUrls.phenotype.studies,
        component: StudyListComponent,
        data: {title: 'Studies'}
    },
    {
        path: AppUrls.phenotype.observations,
        component: ObservationListComponent,
        data: {title: 'Observations'}
    },
    {
        path: AppUrls.phenotype.observations + '/bulk_create',
        component: ObservationBulkCreateComponent,
        data: {title: 'Create observation in bulk'}
    },
    {
        path: AppUrls.phenotype.observation_variables + '/:name',
        component: ObservationVariableDetailComponent,
    },
    {
        path: AppUrls.phenotype.observation_variables,
        component: ObservationVariableListComponent,
        data: {title: 'Observation variables'}
    },
    {
        path: AppUrls.phenotype.traits + '/bulk_create',
        component: TraitBulkCreateComponent,
        data: {title: 'Create traits in bulk'}
    },
    {
        path: AppUrls.phenotype.traits + '/:name',
        component: TraitDetailComponent,
    },
    {
        path: AppUrls.phenotype.scales + '/:name',
        component: ScaleDetailComponent,
        data: {title: 'Scales'}

    },
    {
        path: AppUrls.phenotype.observation_images + '/bulk_create',
        component: ObservationImageBulkCreateComponent,
        data: {title: 'Upload Images'}
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
        InlineAutoScaleComponent,
        ScaleCreateDialogComponent,
        ObservationVariableListComponent,
        InlineScaleValidValuesComponent,
        ObservationImageBulkCreateComponent,
        StudyMultiAutocompleteComponent,
        ObservationVariableMultiAutocompleteComponent
    ],
    entryComponents: [
        TraitCreateDialogComponent,
        ScaleCreateDialogComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class PhenotypeModule { }
