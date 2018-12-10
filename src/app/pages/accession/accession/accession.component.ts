import { Component, Input, SimpleChanges, OnChanges, ViewChildren, OnInit } from '@angular/core';
import { Accession, Passport } from 'src/app/shared/entities/accession.model';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { InlineAutoInstituteComponent } from '../inline-auto-institute/inline-auto-institute.component';
import { conservation_statuses } from '../assets/conservationStatus';
import { InlineEditSelectComponent } from 'src/app/shared/components/inline-edit-select/inline-edit-select.component';
import * as moment from 'moment';
import { PassportComponent } from '../passport/passport.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material';
import { AppUrls } from '../../appUrls';
import { Router } from '@angular/router';

@Component({
    selector: 'kusunoki2-accession',
    templateUrl: './accession.component.html',
    styleUrls: ['./accession.component.scss']
})
export class AccessionComponent {
    @Input() accession: Accession;
    @Input() editMode = false;
    @Input() createMode = false;
    @Input() onTop = true;

    conservation_statuses = conservation_statuses;
    allInputAreValid: boolean;
    inputsValidStatuses = {};

    @ViewChildren(InlineEditComponent) inlineForms;
    @ViewChildren(InlineAutoInstituteComponent) inlineAutoInstitutes;
    @ViewChildren(InlineEditSelectComponent) inlineFormSelect;
    @ViewChildren(PassportComponent) passports;


    constructor(
        private readonly accessionService: AccessionService,
        private readonly statusService: StatusService,
        private readonly router: Router,
        public dialog: MatDialog) { }

    cancelChange() {
        if (this.createMode) {
            this.router.navigate([AppUrls.accessions]);
        } else {
            this.editMode = false;
            this.inlineForms.map(inlineForm => inlineForm.resetForm());
            this.inlineAutoInstitutes.map(inlineForm => inlineForm.resetForm());
            this.inlineFormSelect.map(inlineForm => inlineForm.resetForm());
        }
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
        this.inlineAutoInstitutes.map(inlineForm => {
            formValidData[inlineForm.config.name] = inlineForm.getValueIfFormValid();
        });
        this.inlineFormSelect.map(inlineForm => {
            formValidData[inlineForm.config.name] = inlineForm.getValueIfFormValid();
        });
        this.passports.map(passportform => {
            formValidData[passportform.componentId] = passportform.getValueIfFormValid();
        });
        return formValidData;
    }
    getModelFromFormValidData() {
        const formValidData = this.getFormValidData();
        if (formValidData) {
            const accession = new Accession();
            accession.data.germplasmNumber = formValidData['germplasmNumber'];
            accession.data.instituteCode = formValidData['instituteCode'];
            accession.data.conservation_status = formValidData['conservationStatus'];
            accession.data.is_available = formValidData['isAvailable'];
            const passport = new Passport();

            for (const key of Object.keys(formValidData['passport'])) {
                const value = formValidData['passport'][key];
                if (key === 'germplasmNumber') {
                    passport.germplasmNumber.germplasmNumber = value;
                } else if (key === 'instituteCode') {
                    passport.germplasmNumber.instituteCode = value;
                } else if (key === 'latitute') {
                    passport.collectionSite.latitude = value;
                } else if (key === 'longitude') {
                    passport.collectionSite.longitude = value;
                } else if (key === 'altitude') {
                    passport.collectionSite.altitude = value;
                } else if (key === 'country') {
                    passport.collectionSite.country = value;
                } else if (key === 'state') {
                    passport.collectionSite.state = value;
                } else if (key === 'province') {
                    passport.collectionSite.province = value;
                } else if (key === 'municipality') {
                    passport.collectionSite.municipality = value;
                } else if (key === 'island') {
                    passport.collectionSite.island = value;
                } else if (key === 'other') {
                    passport.collectionSite.other = value;
                } else if (key === 'site') {
                    passport.collectionSite.coordUncertainty = value;
                } else if (key === 'coordUncertainty') {
                    passport.collectionSite.georeferencingMethod = value;
                } else if (key === 'georeferencingMethod') {
                    passport.collectionSite.coordenatesSpatialReference = value;
                } else if (key === 'coordenatesSpatialReference') {
                    passport.collectionSite.other = value;
                } else if (key === 'biologicalStatus') {
                    passport.biologicalStatus = String(value);
                } else if (key === 'collectionSource') {
                    passport.collectionSource = String(value);
                } else if (key === 'collection_date') {
                    passport.collectionDate = value;
                } else if (key === 'acquisition_date') {
                    passport.acquisitionDate = value;
                } else if (key === 'collectingInstitute') {
                    passport.collectionNumber.instituteCode = value;
                } else if (key === 'collectingFieldNumber') {
                    passport.collectionNumber.fieldNumber = value;
                } else if (key === 'donorInstitute') {
                    passport.donor.instituteCode = value;
                } else if (key === 'donorNumber') {
                    passport.donor.germplasmNumber = value;
                } else if (key === 'dataSourceCode') {
                    passport.dataSource.code = value;
                } else if (key === 'dataSourceKind') {
                    passport.dataSource.kind = value;
                } else if (key === 'dataSourceRetriavelDate') {
                    passport.dataSource.retrievalDate = value;
                }
            }
            accession.data.passports.push(passport);
            return accession;
            // return accession;
        }
    }

    updateAccession() {
        const accession = this.getModelFromFormValidData();
        accession.metadata.is_public = this.accession.metadata.is_public;
        accession.metadata.group = this.accession.metadata.group;
        this.editMode = false;
        if (accession) {
            this.accessionService.update(this.accession.data.instituteCode,
                                         this.accession.data.germplasmNumber,
                                         accession.getApiDocument())
                .subscribe(
                    (updatedAccession: Accession) => {
                        this.accession = updatedAccession;
                        this.statusService.info('Accession sucessfully updated');
                    },
                    (error) => console.log(error)
                );
        } else {
            this.statusService.error('Accession data is not valid');
        }
    }

    deleteAccession() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {type: 'Accession',
                   description: `Accession: ${this.accession.data.instituteCode}:${this.accession.data.germplasmNumber}`}
        });
        dialogRef.afterClosed().subscribe(doDeleteAccession => {
            if (doDeleteAccession) {
                this.accessionService.delete(this.accession.data.instituteCode,
                                            this.accession.data.germplasmNumber)
                    .subscribe(
                        response => {
                            this.statusService.info('Accession sucessfully deleted');
                            this.router.navigate([AppUrls.accessions]);
                        },
                        error => this.statusService.error('Could not delete accession')
                    );
            }
        });
    }
}
