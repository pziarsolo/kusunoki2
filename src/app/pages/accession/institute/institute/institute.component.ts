import { Component, OnInit, Input, EventEmitter, Output, ViewChildren, SimpleChanges, OnChanges } from '@angular/core';
import { Institute } from 'src/app/shared/entities/institute.model';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { AppUrls } from 'src/app/pages/appUrls';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'kusunoki2-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent  implements OnChanges{
    @Input() instituteCode: string;
    @Input() editMode = false;
    @Input() createMode = false;
    @Output() instituteCreated = new EventEmitter<Institute>();
    @Output() instituteUpdated = new EventEmitter<Institute>();
    @Output() instituteRequestFinished = new EventEmitter<Institute>();
    @Output() instituteDeleted = new EventEmitter<any>();
    @Output() editCanceled = new  EventEmitter<any>();

    institute: Institute;
    userCanEdit: boolean;

    appUrls = AppUrls;
    allInputAreValid: boolean;
    inputsValidStatuses = {};

    @ViewChildren(InlineEditComponent) inlineForms;

    config = {
        instituteCode: {is_required: true, is_editable: false, name: 'instituteCode'},
        name: {is_required: true, is_editable: true, name: 'name'},
        type: {is_required: false, is_editable: true, name: 'type'},
        address: {is_required: false, is_editable: true, name: 'address'},
        zipcode: {is_required: false, is_editable: true, name: 'zipcode'},
        email: {is_required: false, is_editable: true, name: 'email'},
        phone: {is_required: false, is_editable: true, name: 'phone'},
        city: {is_required: false, is_editable: true, name: 'city'},
        url: {is_required: false, is_editable: true, name: 'url'},
        manager: {is_required: false, is_editable: true, name: 'manager'},
    };

    constructor(
        private instituteService: InstituteService,
        private readonly statusService: StatusService,
        public dialog: MatDialog) {}

    makeAllFieldEditable() {
        for (const child of Object.keys(this.config)) {
            this.config[child]['is_editable'] = true;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('instituteCode' in changes && this.instituteCode) {
            this.instituteService.retrieve(this.instituteCode)
                .subscribe(
                    (institute: Institute) => {
                        this.institute = new Institute(institute);
                        this.instituteRequestFinished.emit(institute);
                    },
                    (error) => {
                        if (error.status === 404) {
                            this.instituteRequestFinished.emit(undefined);
                            this.statusService.info('study not found');
                        }
                    }
                );
        } else if ('createMode' in changes && this.createMode && this.instituteCode === undefined) {
            this.institute = new Institute();
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
            const institute = new Institute();
            institute.instituteCode = formValidData['instituteCode'];
            institute.name = formValidData['name'];
            institute.type = formValidData['type'];
            institute.address = formValidData['address'];
            institute.zipcode = formValidData['zipcode'];
            institute.city = formValidData['city'];
            institute.email = formValidData['email'];
            institute.phone = formValidData['phone'];
            institute.url = formValidData['url'];
            institute.manager = formValidData['manager'];
            return institute;
        }
    }

    updateInstitute() {
        const institute = this.getModelFromFormValidData();
        this.editMode = false;
        if (institute) {
            this.instituteService.update(this.instituteCode,
                                         institute.getApiDocument())
                .subscribe(
                    (updatedInstitute: Institute) => {
                        this.institute = new Institute(updatedInstitute);
                        this.instituteRequestFinished.emit(this.institute);
                        this.statusService.info('Institute sucessfully updated');
                        this.instituteUpdated.emit(this.institute);
                    },
                    (error) => console.log(error)
                );
        } else {
            this.statusService.error('Institute data is not valid');
        }
    }

    deleteInstitute() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {type: 'Institute',
                   description: `Institute: ${this.institute.instituteCode}`}
        });
        dialogRef.afterClosed().subscribe(doDeleteInstitute => {
            if (doDeleteInstitute) {
                this.instituteService.delete(this.institute.instituteCode)
                    .subscribe(
                        response => {
                            this.statusService.info('Institute sucessfully deleted');
                            this.instituteDeleted.emit();
                        },
                        error => this.statusService.error('Could not delete institute')
                    );
            }
        });
    }
    createInstitute() {
        const institute = this.getModelFromFormValidData();
        if (institute) {
            this.instituteService.create(institute.getApiDocument())
                .subscribe(
                    (createdInstitute: Institute) => {
                        this.instituteCreated.emit(createdInstitute);
                        this.statusService.info('Institute sucessfully created');
                    },
                    (error) => console.log(error)
                );
        } else {
            this.statusService.error('Study data is not valid');
        }
    }

}
