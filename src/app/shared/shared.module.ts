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

@NgModule({
    declarations: [
        NotFoundComponent,
        BaseInlinesFormComponent,
        InlineEditComponent,
        PasswordFormComponent,
        DeleteDialogComponent,
        HomeComponent,
        TableListComponent,
        InlineEditSelectComponent,
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
        DeleteDialogComponent
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
        InlineEditComponent,
        PasswordFormComponent,
        DeleteDialogComponent,
        HomeComponent,
        TableListComponent,
        InlineEditSelectComponent,
    ]
})
export class SharedModule { }
