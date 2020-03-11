import { Component, OnInit, Input, Output, ViewChildren, SimpleChanges, OnChanges, ViewChild, EventEmitter } from '@angular/core';
import { Scale } from 'src/app/shared/entities/scale.model';
import { AppUrls } from 'src/app/pages/appUrls';
import { ScaleService } from 'src/app/shared/services/scale.service';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { scaleDataTypes } from 'src/app/pages/accession/assets/scaleDataTypes';
import { InlineEditListComponent } from 'src/app/shared/components/inline-edit-list/inline-edit-list.component';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { InlineEditSelectComponent } from 'src/app/shared/components/inline-edit-select/inline-edit-select.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InlineScaleValidValuesComponent } from '../inline-scale-valid-values/inline-scale-valid-values.component';

@Component({
  selector: 'kusunoki2-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnChanges {
    @Input() editMode: boolean;
    @Input() createMode: boolean;
    @Input() name: string;
    @Output() scaleCreated = new EventEmitter<Scale>();
    @Output() scaleDeleted = new EventEmitter<any>();
    @Output() scaleNotFound = new EventEmitter<any>();
    @Output() changeCanceled = new EventEmitter<any>();

    scale: Scale;
    errorMsg: string;
    allInputAreValid: boolean;
    inputsValidStatuses = {};
    appUrls = AppUrls;
    userCanEdit: boolean;
    dataTypeChoices = scaleDataTypes;

    @ViewChildren(InlineEditComponent) inlineForms;
    @ViewChild(InlineEditSelectComponent) inlineSelectForm;
    @ViewChild(InlineScaleValidValuesComponent) inlineListForm;

    config = {
        name: {is_required: true, is_editable: false, name: 'name'},
        description: {is_required: true, is_editable: true, name: 'description'},
        data_type: {is_required: true, is_editable: true, name: 'data_type',
                    showCode: false},
        decimal_places: {is_required: false, is_editable: true,
                         name: 'decimal_places', type: Number},
        min: {is_required: false, is_editable: true, name: 'min', type: Number},
        max: {is_required: false, is_editable: true, name: 'max', type: Number},
        valid_values: {is_required: false, is_editable: true, name: 'valid_values'}
    };

    constructor(
        private service: ScaleService,
        private currentUserService: CurrentUserService,
        private statusService: StatusService,
        private dialog: MatDialog) { }

    makeAllFieldEditable() {
        for (const child of Object.keys(this.config)) {
            this.config[child]['is_editable'] = true;
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('createMode' in changes && this.createMode) {
            this.scale = new Scale();
            this.makeAllFieldEditable();
        }
        if ('name' in changes && this.name !== undefined && !this.createMode) {
            this.service.retrieve(this.name)
                .subscribe(
                    (scale: Scale) => this.scale = scale,
                    (error) => {
                        if (error.status === 404) {
                            this.scaleNotFound.emit();
                        }
                    });
        }
    }
    checkAllInputAreValid() {
        return  Object.keys(this.inputsValidStatuses)
                    .map(k => this.inputsValidStatuses[k])
                    .every(v => v);
    }
    evalUserPermissions() {
        if (this.userCanEdit === undefined) {
            const userToken = this.currentUserService.currentUserSubject.value;

            if (userToken.is_staff) {
                this.userCanEdit = true;
            } else {
                this.userCanEdit = false;
            }
        }
    }
    checkFormValid(event) {
        Object.assign(this.inputsValidStatuses, event);
        this.allInputAreValid = this.checkAllInputAreValid();
    }

    getFormValidData() {
        const formValidData = {};
        this.inlineForms.map(inlineForm => {
            formValidData[inlineForm.config.name] = inlineForm.getValueIfFormValid();
        });
        formValidData['data_type'] = this.inlineSelectForm.getValueIfFormValid();
        if (this.inlineListForm) {
            formValidData['valid_values'] = this.inlineListForm.getValueIfFormValid();
        }

        return formValidData;
    }

    getModelFromFormValidData() {
        const formValidData = this.getFormValidData();
        if (formValidData) {
            const scale = new Scale();
            scale.name = formValidData['name'];
            scale.description = formValidData['description'];
            scale.data_type = formValidData['data_type'];
            if (scale.data_type === 'Numerical') {
                scale.decimal_places = formValidData['decimal_places'];
                scale.min = formValidData['min'];
                scale.max = formValidData['max'];
            } else if (scale.data_type.indexOf('Nominal') > -1 || scale.data_type.indexOf('Ordinal') > -1) {
                scale.valid_values = formValidData['valid_values'];
            }
            return scale;
        }
    }
    cancelChange() {
        this.changeCanceled.emit(true);
    }
    resetForm() {
        this.inlineForms.map(inlineForm => inlineForm.resetForm());
        this.inlineListForm.resetForm();
    }
    createScale() {
        const scale = this.getModelFromFormValidData();
        if (scale) {
            this.service.create(scale)
                .subscribe(
                    (createdScale: Scale) => this.scaleCreated.emit(createdScale),
                    (error) => this.statusService.error(error.error.detail[0])
                );
        }
    }
    updateScale() {
        const scale = this.getModelFromFormValidData();
        if (scale) {
            this.service.update(this.name, scale)
                .subscribe(
                    (updatedScale: Scale) => {
                        this.statusService.info('Scale updated successfully');
                        this.scale = updatedScale;
                    },
                    (error) => {
                        this.statusService.error(error.error.detail[0]);
                        this.resetForm();
                    }
                );
        }
    }
    deleteScale() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {type: 'Scale',
                   description: `Scale: ${this.scale.name}`}
        });
        dialogRef.afterClosed().subscribe(doDeleteAccession => {
            if (doDeleteAccession) {
                this.service.delete(this.name)
                    .subscribe(() => {
                        this.statusService.info('Successfully deleted');
                        this.scaleDeleted.emit(true);
                    },
                    error => this.statusService.error(`Could not delete scale: ${error.error.detail}`)
                    );
            }
        });
    }
}
