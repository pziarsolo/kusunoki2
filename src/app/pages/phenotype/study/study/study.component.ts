import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChildren, Output, EventEmitter } from '@angular/core';
import { StudyService } from 'src/app/shared/services/study.service';
import { Study } from 'src/app/shared/entities/study.model';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { MatDialog } from '@angular/material';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { AppUrls } from 'src/app/pages/appUrls';

@Component({
  selector: 'kusunoki2-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnChanges {
    @Input() name: string;
    @Input() editMode = false;
    @Input() createMode = false;
    @Output() studyCreated = new EventEmitter<Study>();
    @Output() studyRequestFinished = new EventEmitter<Study>();
    @Output() studyDeleted = new EventEmitter<any>();
    @Output() editCanceled = new  EventEmitter<any>();

    study: Study;

    userCanEdit: boolean;

    allInputAreValid: boolean;
    inputsValidStatuses = {};
    appUrls = AppUrls;
    @ViewChildren(InlineEditComponent) inlineForms;
    config = {
        name: {is_required: true, is_editable: false, name: 'name'},
        active: {
            name: 'active', is_editable: true,
            widget: {
                type: 'switch', conf: {'true': 'Is active', 'false': 'Is Not active'}
            }},
        description: {is_required: true, is_editable: true, name: 'description'},
        start_date: {widget: {type: 'datePicker'}, name: 'start_date'},
        end_date: {widget: {type: 'datePicker'}, name: 'end_date'},
        location: {is_required: false, is_editable: true, name: 'location'},
        contacts: {is_required: false, is_editable: true, name: 'contacts'},
        season: {is_required: false, is_editable: true, name: 'season'},
        institution: {is_required: false, is_editable: true, name: 'institition'}
    };

    constructor(
        private studyService: StudyService,
        private readonly statusService: StatusService,
        public dialog: MatDialog) {
    }

    makeAllFieldEditable() {
        for (const child of Object.keys(this.config)) {
            this.config[child]['is_editable'] = true;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('name' in changes && this.name) {
            this.studyService.retrieve(this.name)
                .subscribe(
                    (study: Study) => {
                        this.study = new Study(study);
                        this.studyRequestFinished.emit(study);
                    },
                    (error) => {
                        if (error.status === 404) {
                            this.studyRequestFinished.emit(undefined);
                            this.statusService.info('study not found');
                        }
                    }
                );
        } else if ('createMode' in changes && this.createMode && this.name === undefined) {
            this.study = new Study();
            this.makeAllFieldEditable();
        }
    }

    resetForm() {
        this.editMode = false;
        this.inlineForms.map(inlineForm => inlineForm.resetForm());
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
        return formValidData;
    }
    getModelFromFormValidData() {
        const formValidData = this.getFormValidData();
        if (formValidData) {
            const study = new Study();
            study.data.name = formValidData['name'];
            study.data.description = formValidData['description'];
            study.data.start_date = formValidData['start_date'];
            study.data.end_date = formValidData['end_date'];
            study.data.active = formValidData['active'];
            study.data.contacts = formValidData['contacts'];
            study.data.location = formValidData['location'];
            return study;
        }
    }
    tooglePublic() {
        this.study.metadata.is_public = !this.study.metadata.is_public;
        this.studyService.update(this.study.data.name,
                                 this.study.getApiDocument())
            .subscribe(
                (updatedStudy: Study) => {
                    this.study = updatedStudy;
                    this.statusService.info('Accession sucessfully updated');
                },
                (error) => console.log(error)
            );
    }
    updateStudy() {
        const study = this.getModelFromFormValidData();

        study.metadata.is_public = this.study.metadata.is_public;
        study.metadata.group = this.study.metadata.group;
        this.editMode = false;
        if (study) {
            this.studyService.update(this.study.data.name,
                                         study.getApiDocument())
                .subscribe(
                    (updatedStudy: Study) => {
                        this.study = updatedStudy;
                        this.statusService.info('Study sucessfully updated');
                    },
                    (error) => console.log(error)
                );
        } else {
            this.statusService.error('Study data is not valid');
        }
    }

    deleteStudy() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {type: 'Study',
                   description: `Study: ${this.study.data.name}`}
        });
        dialogRef.afterClosed().subscribe(doDeleteAccession => {
            if (doDeleteAccession) {
                this.studyService.delete(this.study.data.name)
                    .subscribe(
                        response => {
                            this.statusService.info('Study sucessfully deleted');
                            this.studyDeleted.emit();
                        },
                        error => this.statusService.error('Could not delete study')
                    );
            }
        });
    }
    createStudy() {
        const study = this.getModelFromFormValidData();
        if (study) {
            this.studyService.create(study.getApiDocument())
                .subscribe(
                    (createdStudy: Study) => {
                        this.studyCreated.emit(createdStudy);
                        this.statusService.info('Study sucessfully created');
                    },
                    (error) => console.log(error)
                );
        } else {
            this.statusService.error('Study data is not valid');
        }
    }

}
