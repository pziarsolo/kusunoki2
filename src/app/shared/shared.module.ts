import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialBaseModule } from './MaterialBase.module';
import { StatusModule } from './StatusModule/status.module';
import { HttpClientModule } from '@angular/common/http';
import { BaseInlinesFormComponent } from './components/base-inlines-form/base-inlines-form.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { PipesModule } from './pipes/pipes.module';
import { FormsModule, ReactiveFormsModule, NG_VALIDATORS } from '@angular/forms';
import { InlineEditSelectComponent } from './components/inline-edit-select/inline-edit-select.component';
import { BaseInlinesForm2Component } from './components/base-inlines2-form/base-inlines-form2.component';
import { ObservableTableComponent } from './components/observable-table/observable-table.component';
import { ProgressSpinnerDialogComponent } from './components/progress-spinner-dialog/progress-spinner-dialog.component';
import { TableWithFilterComponent } from './components/table-with-filter/table-with-filter.component';
import { BulkCreateComponent } from './components/bulk-create/bulk-create.component';
import { RouterModule } from '@angular/router';
import { TableSearchPageComponent } from './components/table-search-page/table-search-page.component';
import { ObservationTableComponent } from './components/entity-tables/observation-table/observation-table.component';
import { StudyTableComponent } from './components/entity-tables/study-table/study-table.component';
import { AccessionTableComponent } from './components/entity-tables/accession-table/accession-table.component';
import { AccessionSetTableComponent } from './components/entity-tables/accessionset-table/accessionset-table.component';
import { GoogleMapComponent } from './components/google/google-map/google-map.component';
import { GoogleMapchartComponent } from './components/google/google-mapchart/google-mapchart.component';
import { GoogleBarchartComponent } from './components/google/google-barchart/google-barchart.component';
import { GoogleTreemapComponent } from './components/google/google-treemap/google-treemap.component';
import { GooglePieChartComponent } from './components/google/google-piechart/google-piechart.component';
import { GoogleMapMultiMarkerComponent } from './components/google/google-map-multi-marker/google-map-multi-marker.component';
import { InlineEditListComponent } from './components/inline-edit-list/inline-edit-list.component';
import { ObservationVariableTableComponent
} from './components/entity-tables/observation-variable-table/observation-variable-table.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ObservationImageGalleryComponent } from './components/entity-tables/observation-image-gallery/observation-image-gallery.component';
import { LeafletMapComponent } from './components/leaflet/leaflet-map/leaflet-map.component';
import { GenericMapComponent } from './components/maps/generic-map/generic-map.component';
import { GenericMultiMarkerComponent } from './components/maps/generic-multi-marker/generic-multi-marker.component';
import { LeafletMultiMarkerComponent } from './components/leaflet/leaflet-multi-marker/leaflet-multi-marker.component';
import { FlatpagesComponent } from './components/flatpages/flatpages.component';
import { GoogleReCaptcha2Directive } from './directives/google-re-captcha2.directive';
import { MinValidatorDirective } from './directives/min-validator.directive';
import { MaxValidatorDirective } from './directives/max-validator.directive';


@NgModule({
    declarations: [
        BaseInlinesFormComponent,
        BaseInlinesForm2Component,
        InlineEditComponent,
        PasswordFormComponent,
        DeleteDialogComponent,
        InlineEditSelectComponent,
        GoogleMapComponent,
        GoogleMapchartComponent,
        GoogleBarchartComponent,
        GoogleTreemapComponent,
        GooglePieChartComponent,
        GoogleMapMultiMarkerComponent,
        ObservableTableComponent,
        ProgressSpinnerDialogComponent,
        TableWithFilterComponent,
        ObservationTableComponent,
        StudyTableComponent,
        BulkCreateComponent,
        TableSearchPageComponent,
        AccessionTableComponent,
        AccessionSetTableComponent,
        InlineEditListComponent,
        ObservationVariableTableComponent,
        ObservationImageGalleryComponent,
        LeafletMapComponent,
        LeafletMultiMarkerComponent,
        GenericMapComponent,
        GenericMultiMarkerComponent,
        FlatpagesComponent,
        GoogleReCaptcha2Directive,
        MinValidatorDirective,
        MaxValidatorDirective,

    ],
    imports: [
        HttpClientModule,
        CommonModule,
        FlexLayoutModule,
        MaterialBaseModule,
        StatusModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxGalleryModule
    ],
    entryComponents: [
        DeleteDialogComponent,
        ProgressSpinnerDialogComponent
    ],
    exports : [
        CommonModule,
        FlexLayoutModule,
        MaterialBaseModule,
        ReactiveFormsModule,
        StatusModule,
        PipesModule,
        BaseInlinesFormComponent,
        BaseInlinesForm2Component,
        InlineEditComponent,
        PasswordFormComponent,
        DeleteDialogComponent,
        InlineEditSelectComponent,
        // GoogleMapComponent,
        GoogleMapchartComponent,
        GoogleBarchartComponent,
        GoogleTreemapComponent,
        GooglePieChartComponent,
        GoogleMapMultiMarkerComponent,
        ObservableTableComponent,
        ProgressSpinnerDialogComponent,
        ObservationTableComponent,
        StudyTableComponent,
        AccessionTableComponent,
        AccessionSetTableComponent,
        InlineEditListComponent,
        ObservationVariableTableComponent,
        ObservationImageGalleryComponent,
        NgxGalleryModule,
        // LeafletMapComponent,
        GenericMapComponent,
        GenericMultiMarkerComponent,
        FlatpagesComponent,
        GoogleReCaptcha2Directive,
        MinValidatorDirective,
        MaxValidatorDirective
    ]
})
export class SharedModule { }
