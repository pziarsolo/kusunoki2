import { Component, OnInit, Input, Output, AfterViewChecked, ViewChild } from '@angular/core';
import { Passport } from 'src/app/shared/entities/accession.model';
import { BaseInlinesForm2Component } from 'src/app/shared/components/base-inlines2-form/base-inlines-form2.component';
import { Validators } from '@angular/forms';
import { biological_status } from '../assets/biologicalStatus';
import { collection_sources } from '../assets/collectionSources';
import { OtherNumbersComponent } from '../passport-other-numbers/other-numbers.component';

@Component({
  selector: 'kusunoki2-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.scss']
})
export class PassportComponent extends BaseInlinesForm2Component implements AfterViewChecked {
    @Input() passport: Passport;
    @Input() editMode: boolean;
    @Input() componentId: string;
    ranks = ['family', 'genus', 'species', 'subspecies', 'variety',
             'convarietas', 'group', 'forma'];
    collection_sources = collection_sources;
    biological_statuses = biological_status;

    childrenConfig = {
        instituteCode: {
            name: 'instituteCode',
            is_editable: true,
            is_required: true,
        },
        germplasmNumber: {
            name: 'germplasmNumber',
            is_editable: true,
            is_required: true,
        },
        family_name: {name: 'family_name'},
        family_author: {name: 'family_author'},
        genus_name: {name: 'genus_name'},
        genus_author: {name: 'genus_author'},
        species_name: {name: 'species_name'},
        species_author: {name: 'species_author'},
        subspecies_name: {name: 'subspecies_name'},
        subspecies_author: {name: 'subspecies_author'},
        variety_name: {name: 'variety_name'},
        variety_author: {name: 'variety_author'},
        convarietas_name: {name: 'convarietas_name'},
        convarietas_author: {name: 'convarietas_author'},
        group_name: {name: 'group_name'},
        group_author: {name: 'group_author'},
        forma_name: {name: 'forma_name'},
        forma_author: {name: 'forma_author'},
        country: {name: 'country'},
        state: {name: 'state'},
        province: {name: 'province'},
        municipality: {name: 'municipality'},
        island: {name: 'island'},
        other: {name: 'other'},
        site: {name: 'site'},
        coordUncertainty: {name: 'coordUncertainty'},
        georeferencingMethod: {name: 'georeferencingMethod'},
        coordenatesSpatialReference: {name: 'coordenatesSpatialReference'},
        latitude: {
            name: 'latitute',
            type: Number,
            validators: [Validators.min(-90),
                         Validators.max(90)]
        },
        longitude: {
            name: 'longitude',
            type: Number,
            validators: [Validators.min(-180),
                         Validators.max(180)]
        },
        altitude: {
            name: 'altitude',
            type: Number,
            validators: [Validators.min(-100),
                         Validators.max(7000)]
        },
        biologicalStatus: {
            name: 'biologicalStatus',
        },
        collectionSource: {
            name: 'collectionSource',
        },
        collection_date: {
            name: 'collection_date',
            is_editable: true,
            widget: {type: 'datePicker'}
        },
        mlsStatus: {
            name: 'mlsStatus',
            showCode: false
        },
        breedingInstitute: {
            name: 'breedingInstitute'
        },
        germplasmName: {
            name: 'germplasmName'
        },
        ancestry: {
            name: 'ancestry'
        },
        remarks: {
            name: 'remarks'
        },
        commonCropName: {
            name: 'commonCropName'
        },
        acquisition_date: {
            name: 'acquisition_date',
            is_editable: true,
            widget: {type: 'datePicker'}
        },
        collectingInstitute: {
            name: 'collectingInstitute'
        },
        collectingFieldNumber: {
            name: 'collectingFieldNumber'
        },
        donorInstitute: {
            name: 'donorInstitute'
        },
        donorNumber: {
            name: 'donorNumber'
        },
        dataSourceCode: {
            name: 'dataSourceCode'
        },
        dataSourceKind: {
            name: 'dataSourceKind'
        },
        dataSourceRetriavelDate: {
            name: 'dataSourceRetriavelDate',
            widget: {type: 'datePicker'}
        },
        germplasmStorageType: {
            name: 'germplasmStorageType'
        },
        locationOfSavedDuplicates: {
            name: 'locationOfSavedDuplicates'
        }

    };
    @ViewChild(OtherNumbersComponent, {static: false}) OtherNumbers;

    ngAfterViewChecked() {
        super.ngAfterViewChecked();
        this.childrenComponents.push(this.OtherNumbers);
    }
    hasAdinitionalData() {

        if (this.passport.biologicalStatus ||
            this.passport.collectionSource ||
            this.passport.acquisitionDate ||
            this.passport.mlsStatus ||
            this.passport.ancestry ||
            (this.passport.remarks  && this.passport.remarks.genebank_management) ||
            this.passport.breedingInstitute) {
            return true;
        }
        return false;
    }
    hasCollectionData() {
        if (this.passport.collectionSite.hasData ||
            this.passport.collectionNumber.hasData ||
            this.passport.germplasmName) {
            return true;
        }
        return false;

    }
}
