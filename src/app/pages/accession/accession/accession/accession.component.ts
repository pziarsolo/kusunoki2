import { Component, Input, SimpleChanges, OnChanges, ViewChildren, OnInit } from '@angular/core';
import { Accession, Passport, AccessionId } from 'src/app/shared/entities/accession.model';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { InlineEditSelectComponent } from 'src/app/shared/components/inline-edit-select/inline-edit-select.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { AccessionSetService } from 'src/app/shared/services/accessionset.service';
import { AppUrls } from 'src/app/pages/appUrls';
import { conservation_statuses } from '../../assets/conservationStatus';
import { InlineAutoInstituteComponent } from '../../institute/inline-auto-institute/inline-auto-institute.component';
import { PassportComponent } from '../../passport/passport.component';
import { ObservationImageGalleryComponent
    } from 'src/app/shared/components/entity-tables/observation-image-gallery/observation-image-gallery.component';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

import * as moment from 'moment';
@Component({
    selector: 'kusunoki2-accession',
    templateUrl: './accession.component.html',
    styleUrls: ['./accession.component.scss']
})
export class AccessionComponent implements OnChanges {
    @Input() accession: Accession;
    @Input() editMode = false;
    @Input() createMode = false;
    @Input() onTop = true;
    @Input() mapId;

    appConfig: AppConfig;
    appUrls = AppUrls;
    accessionsets: string[];
    userCanEdit: boolean;

    conservation_statuses = conservation_statuses;
    allInputAreValid: boolean;
    inputsValidStatuses = {};

    @ViewChildren(InlineEditComponent) inlineForms;
    @ViewChildren(InlineAutoInstituteComponent) inlineAutoInstitutes;
    @ViewChildren(InlineEditSelectComponent) inlineFormSelect;
    @ViewChildren(PassportComponent) passports;
    @ViewChildren(ObservationImageGalleryComponent) gallery;

    showImages = false;
    showObservations = false;
    showStudies = false;

    config = {
        institute: {
            is_required: true, is_editable: false, name: 'instituteCode'
        },
        germplasmNumber: {
            is_required: true, is_editable: false, name: 'germplasmNumber'
        },
        conservation_status: {
            name: 'conservationStatus', is_editable: true, showCode: false
        },
        is_available: {
            name: 'isAvailable', is_editable: true,
            widget: {
                type: 'switch',
                conf: {
                    'true': 'Is available',
                    'false': 'Is not available'
                }
            }
        },
        in_nuclear_collection: {
            name: 'inNuclearCollection', is_editable: true,
            widget: {
                type: 'switch',
                conf: {
                    'true_long': 'Belongs to a core collection',
                    'false_long': 'Does not belong to a core collection',
                    'true': 'Yes',
                    'false': 'No'
                }
            }
        },
    };

    constructor(
        private readonly accessionService: AccessionService,
        private readonly statusService: StatusService,
        private readonly router: Router,
        public readonly currentUserService: CurrentUserService,
        private readonly accessionsetService: AccessionSetService,
        public readonly shoppingCartService: ShoppingCartService,
        public dialog: MatDialog,
        private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
    }
    makeAllFieldEditable() {
        for (const child of Object.keys(this.config)) {
            this.config[child]['is_editable'] = true;
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('accession' in changes && this.accession && this.accession.data.germplasmNumber) {
            this.evalUserPermissions();
            if (this.appConfig.useAccessionset) {
                this.accessionsetService.list(
                    {
                        accession_number: this.accession.data.germplasmNumber,
                        accession_institute: this.accession.data.instituteCode
                    })
                    .subscribe(
                        response => {
                            this.accessionsets = response.body.map(item => item.data.accessionsetNumber);
                        },
                        error => console.log(error)
                    );
            }
        } else if ('createMode' in changes && this.createMode) {
            this.makeAllFieldEditable();
        }
    }
    evalUserPermissions() {
        if (this.userCanEdit === undefined) {
            const userToken = this.currentUserService.currentUserSubject.value;
            console.log(userToken);
            const group = this.accession.metadata.group;
            const is_public = this.accession.metadata.is_public;
            if (userToken.is_staff) {
                this.userCanEdit = true;
            } else if (userToken.groups && userToken.groups.indexOf(group) !== -1 && !is_public) {
                this.userCanEdit = true;
            } else {
                this.userCanEdit = false;
            }
        }
    }

    cancelChange() {
        if (this.createMode) {
            this.router.navigate([AppUrls.accessions]);
        } else {
            this.editMode = false;
            this.inlineForms.map(inlineForm => inlineForm.resetForm());
            this.inlineAutoInstitutes.map(inlineForm => inlineForm.resetForm());
            this.inlineFormSelect.map(inlineForm => inlineForm.resetForm());
            this.passports.map(passportComponent => passportComponent.resetForm());
        }
    }

    checkAllInputAreValid() {
        return Object.keys(this.inputsValidStatuses)
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
            accession.data.in_nuclear_collection = formValidData['inNuclearCollection'];
            const passport = new Passport();
            for (const key of Object.keys(formValidData['passport'])) {

                let value = formValidData['passport'][key];
                if (key === 'germplasmNumber') {
                    passport.germplasmNumber.germplasmNumber = value;
                } else if (key === 'instituteCode') {
                    passport.germplasmNumber.instituteCode = value;
                } else if (key === 'latitude') {
                    passport.collectionSite.latitude = Number(value);
                } else if (key === 'longitude') {
                    passport.collectionSite.longitude = Number(value);
                } else if (key === 'altitude') {
                    passport.collectionSite.altitude = Number(value);
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
                } else if (key === 'coordUncertainty') {
                    passport.collectionSite.coordUncertainty = value;
                } else if (key === 'georeferencingMethod') {
                    passport.collectionSite.georeferencingMethod = value;
                } else if (key === 'coordenatesSpatialReference') {
                    passport.collectionSite.coordenatesSpatialReference = value;
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
                    passport.collectionNumber.fieldCollectionNumber = value;
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
                } else if (key === 'family_name') {
                    passport.taxonomy.family.name = value;
                    passport.taxonomy.family.rank = 'family';
                } else if (key === 'family_author') {
                    passport.taxonomy.family.author = value;
                } else if (key === 'genus_name') {
                    passport.taxonomy.genus.name = value;
                } else if (key === 'genus_author') {
                    passport.taxonomy.genus.author = value;
                } else if (key === 'species_name') {
                    passport.taxonomy.species.name = value;
                } else if (key === 'species_author') {
                    passport.taxonomy.species.author = value;
                } else if (key === 'subspecies_name') {
                    passport.taxonomy.subspecies.name = value;
                } else if (key === 'subspecies_author') {
                    passport.taxonomy.subspecies.author = value;
                } else if (key === 'variety_name') {
                    passport.taxonomy.variety.name = value;
                } else if (key === 'variety_author') {
                    passport.taxonomy.variety.author = value;
                } else if (key === 'convarietas_name') {
                    passport.taxonomy.convarietas.name = value;
                } else if (key === 'convarietas_author') {
                    passport.taxonomy.convarietas.author = value;
                } else if (key === 'group_name') {
                    passport.taxonomy.group.name = value;
                } else if (key === 'group_author') {
                    passport.taxonomy.group.author = value;
                } else if (key === 'forma_name') {
                    passport.taxonomy.forma.name = value;
                } else if (key === 'forma_author') {
                    passport.taxonomy.forma.author = value;
                } else if (key === 'otherNumbers') {
                    passport.otherNumbers = value.map(item => new AccessionId(item));
                } else if (key === 'ancestry') {
                    passport.ancestry = value;
                } else if (key === 'mlsStatus') {
                    passport.mlsStatus = value;
                } else if (key === 'remarks') {
                    if (value) {
                        value = { 'genebank_management': value };
                    }
                    passport.remarks = value;
                } else if (key === 'breedingInstitute') {
                    passport.breedingInstitute = value;
                } else if (key === 'germplasmName') {
                    passport.germplasmName = value;
                } else if (key === 'commonCropName') {
                    passport.commonCropName = value;
                } else if (key === 'germplasmStorageType') {
                    passport.germplasmStorageType = value;
                } else if (key === 'locationOfSavedDuplicates') {
                    passport.locationOfSavedDuplicates = value;
                }
            }
            accession.data.passports.push(passport);
            return accession;
        }
    }
    tooglePublic() {
        this.accession.metadata.is_public = !this.accession.metadata.is_public;
        this.accessionService.update(this.accession.data.instituteCode,
            this.accession.data.germplasmNumber,
            this.accession.getApiDocument())
            .subscribe(
                (updatedAccession: Accession) => {
                    this.accession = updatedAccession;
                    this.statusService.info('Accession sucessfully updated');
                },
                (error) => console.log(error)
            );
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
            data: {
                type: 'Accession',
                description: `Accession: ${this.accession.data.instituteCode}:${this.accession.data.germplasmNumber}`
            }
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
                        error => this.statusService.error(error.error.detail)
                    );
            }
        });
    }
    createAccession() {
        const accession = this.getModelFromFormValidData();
        if (accession) {
            this.accessionService.create(accession.getApiDocument())
                .subscribe(
                    (createdAccession: Accession) => {
                        this.router.navigate([AppUrls.accessions,
                        createdAccession.data.instituteCode,
                        createdAccession.data.germplasmNumber]);

                        this.statusService.info('Accession sucessfully created');
                    },
                    (error) => console.log(error)
                );
        } else {
            this.statusService.error('Accession data is not valid');
        }
    }
}
