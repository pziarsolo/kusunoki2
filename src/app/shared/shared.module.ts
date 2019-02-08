import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialBaseModule } from './MaterialBase.module';
import { StatusModule } from './StatusModule/status.module';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found-component';
import { BaseInlinesFormComponent } from './components/base-inlines-form/base-inlines-form.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { PipesModule } from './pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home-component';
import { TableListComponent } from './components/table-list/table-list.component';
import { InlineEditSelectComponent } from './components/inline-edit-select/inline-edit-select.component';
import { BaseInlinesForm2Component } from './components/base-inlines2-form/base-inlines-form2.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { GoogleMapchartComponent } from './components/google-mapchart/google-mapchart.component';
import { ObservableTableComponent } from './components/observable-table/observable-table.component';
import { GoogleBarchartComponent } from './components/google-barchart/google-barchart.component';
import { GoogleTreemapComponent } from './components/google-treemap/google-treemap.component';
import { GooglePieChartComponent } from './components/google-piechart/google-piechart.component';
import { GoogleMapMultiMarkerComponent } from './components/google-map-multi-marker/google-map-multi-marker.component';
import { ProgressSpinnerDialogComponent } from './components/progress-spinner-dialog/progress-spinner-dialog.component';

@NgModule({
    declarations: [
        NotFoundComponent,
        BaseInlinesFormComponent,
        BaseInlinesForm2Component,
        InlineEditComponent,
        PasswordFormComponent,
        DeleteDialogComponent,
        HomeComponent,
        TableListComponent,
        InlineEditSelectComponent,
        GoogleMapComponent,
        GoogleMapchartComponent,
        GoogleBarchartComponent,
        GoogleTreemapComponent,
        GooglePieChartComponent,
        GoogleMapMultiMarkerComponent,
        ObservableTableComponent,
        ProgressSpinnerDialogComponent,

    ],
    imports: [
        HttpClientModule,
        CommonModule,
        FlexLayoutModule,
        MaterialBaseModule,
        StatusModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule
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
        NotFoundComponent,
        BaseInlinesFormComponent,
        BaseInlinesForm2Component,
        InlineEditComponent,
        PasswordFormComponent,
        DeleteDialogComponent,
        HomeComponent,
        TableListComponent,
        InlineEditSelectComponent,
        GoogleMapComponent,
        GoogleMapchartComponent,
        GoogleBarchartComponent,
        GoogleTreemapComponent,
        GooglePieChartComponent,
        GoogleMapMultiMarkerComponent,
        ObservableTableComponent,
        ProgressSpinnerDialogComponent
    ]
})
export class SharedModule { }
