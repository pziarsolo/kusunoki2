import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChildren, ViewChild, EventEmitter, Output } from '@angular/core';
import { ObservationVariableService } from 'src/app/shared/services/observation_variable.service';
import { ObservationVariable } from 'src/app/shared/entities/onservation_variable.model';
import { Scale } from 'src/app/shared/entities/scale.model';
import { Router } from '@angular/router';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppUrls } from 'src/app/pages/appUrls';
import { InlineAutoTraitComponent } from '../../trait/inline-auto-trait/inline-auto-trait.component';
import { TraitCreateDialogComponent } from '../../trait/trait-create-dialog/trait-create-dialog.component';
import { InlineAutoScaleComponent } from '../../scale/inline-auto-scale/inline-auto-scale.component';
import { ScaleCreateDialogComponent } from '../../scale/scale-create-dialog/scale-create-dialog.component';


@Component({
  selector: 'kusunoki2-observation-variable',
  templateUrl: './observation-variable.component.html',
  styleUrls: ['./observation-variable.component.scss']
})
export class ObservationVariableComponent implements OnChanges {
    @Input() name: string;
    @Input() editMode = false;
    @Input() createMode = false;
    @Output() variableCreated = new EventEmitter<ObservationVariable>();
    @Output() variableDeleted = new EventEmitter<any>();
    @Output() variableFound = new EventEmitter<boolean>();
    observationVariable: ObservationVariable;

    userCanEdit: boolean;
    allInputAreValid: boolean;
    inputsValidStatuses = {};
    appUrls = AppUrls;

    @ViewChildren(InlineEditComponent) inlineForms;
    @ViewChild(InlineAutoTraitComponent) inlineAutoTraitForm;
    @ViewChild(InlineAutoScaleComponent) inlineAutoScaleForm;

    config = {
        name: {is_required: true, is_editable: false, name: 'name'},
        description: {is_required: true, is_editable: true, name: 'description'},
        method: {is_required: true, is_editable: true, name: 'method'},
        trait: {is_required: true, is_editable: true, name: 'trait'},
        scale: {is_required: true, is_editable: true, name: 'scale'}
    };

    constructor(
        private observationVariableService: ObservationVariableService,
        private currentUserService: CurrentUserService,
        private statusService: StatusService,
        public dialog: MatDialog) { }

    makeAllFieldEditable() {
        for (const child of Object.keys(this.config)) {
            this.config[child]['is_editable'] = true;
        }
    }
    evalUserPermissions() {
        if (this.userCanEdit === undefined) {
            const userToken = this.currentUserService.currentUserSubject.value;
            const group = this.observationVariable.metadata.group;

            if (userToken.is_staff) {
                this.userCanEdit = true;
            } else if (userToken.groups && group in userToken.groups) {
                this.userCanEdit = true;
            } else {
                this.userCanEdit = false;
            }
        }
    }
    makeRetrieveQueries(variableName) {
        this.observationVariableService.retrieve(this.name)
            .subscribe(
                (variable: ObservationVariable) => {
                    this.observationVariable = new ObservationVariable(variable);
                    this.evalUserPermissions();
                    this.variableFound.emit(true);
                },
                (error) => {
                    console.log(error);
                    this.variableFound.emit(false);
                }
            );
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('name' in changes && this.name !== undefined) {
            this.makeRetrieveQueries(this.name);
        } else if ('createMode' in changes && this.createMode && this.name===undefined) {
            this.observationVariable = new ObservationVariable();
            this.makeAllFieldEditable();
            this.evalUserPermissions();
        }
    }

    resetForm() {
        this.inlineForms.map(inlineForm => inlineForm.resetForm());
        this.inlineAutoTraitForm.resetForm();
        this.inlineAutoScaleForm.resetForm();
    }
    checkAllInputAreValid() {
        return  Object.keys(this.inputsValidStatuses)
                    .map(k => this.inputsValidStatuses[k])
                    .every(v => v);
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
        formValidData['trait'] = this.inlineAutoTraitForm.getValueIfFormValid();
        formValidData['scale'] = this.inlineAutoScaleForm.getValueIfFormValid();
        return formValidData;
    }
    getModelFromFormValidData() {
        const formValidData = this.getFormValidData();
        if (formValidData) {
            const variable = new ObservationVariable();
            variable.metadata.group = this.observationVariable.metadata.group;
            variable.data.name = formValidData['name'];
            variable.data.description = formValidData['description'];
            variable.data.method = formValidData['method'];
            variable.data.scale = formValidData['scale'];
            variable.data.trait = formValidData['trait'];
            return variable;
        }
    }
    updateVariable() {
        const variable = this.getModelFromFormValidData();
        this.observationVariableService.update(this.name, variable)
            .subscribe((variable: ObservationVariable) => {
                this.observationVariable = variable;
                this.makeRetrieveQueries(variable.data.name);
                this.statusService.info('Observation variable updated successfully')
                this.editMode = false;
            });

    }
    createVariable() {
        const variable = this.getModelFromFormValidData();
        this.observationVariableService.create(variable)
            .subscribe((newVariable: ObservationVariable) => {
                this.observationVariable = newVariable;
                this.statusService.info('Observation variable successfully created');
                this.variableCreated.emit(newVariable);

            });

    }
    deleteVariable() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {type: 'ObservationVariable',
                   description: `ObservationVariable: ${this.observationVariable.data.name}`}
        });
        dialogRef.afterClosed().subscribe(doDeleteAccession => {
            if (doDeleteAccession) {
                this.observationVariableService.delete(this.observationVariable.data.name)
                    .subscribe(
                        response => {
                            this.statusService.info('ObservationVariable sucessfully deleted');
                            this.variableDeleted.emit(true);
                        },
                        error => this.statusService.error('Could not delete observation variable')
                    );
            }
        });
    }
    addNewTrait() {
        const dialogRef = this.dialog.open(TraitCreateDialogComponent, {
            width: '700px',
        });
        dialogRef.afterClosed().subscribe(trait => {
            if (trait) {
                this.inlineAutoTraitForm.inputControl.patchValue(trait);
            }
        });
    }
    addNewScale() {
        const dialogRef = this.dialog.open(ScaleCreateDialogComponent, {
            width: '700px',
        });
        dialogRef.afterClosed().subscribe(scale => {
            if (scale) {
                this.inlineAutoScaleForm.inputControl.patchValue(scale);
            }
        });
    }


}
