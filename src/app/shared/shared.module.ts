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

@NgModule({
    declarations: [
        NotFoundComponent,
        BaseInlinesFormComponent,
        InlineEditComponent,
        PasswordFormComponent,
        DeleteDialogComponent
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
        StatusModule,
        PipesModule,
        NotFoundComponent,
        BaseInlinesFormComponent,
        InlineEditComponent,
        PasswordFormComponent,
        DeleteDialogComponent
    ]
})
export class SharedModule { }
