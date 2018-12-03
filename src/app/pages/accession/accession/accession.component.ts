import { Component, Input, SimpleChanges, OnChanges, ViewChildren, OnInit } from '@angular/core';
import { Accession } from 'src/app/shared/entities/accession.model';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { InlineAutoInstituteComponent } from '../inline-auto-institute/inline-auto-institute.component';
import { conservation_statuses } from '../assets/conservationStatus';
import { InlineEditSelectComponent } from 'src/app/shared/components/inline-edit-select/inline-edit-select.component';
import * as moment from 'moment';

@Component({
    selector: 'kusunoki2-accession',
    templateUrl: './accession.component.html',
    styleUrls: ['./accession.component.scss']
})
export class AccessionComponent implements OnChanges {
    @Input() instituteCode: string;
    @Input() germplasmNumber: string;
    @Input() editMode: Boolean = false;
    @Input() onTop: Boolean = true;
    accession: Accession;

    conservation_statuses = conservation_statuses;
    allInputAreValid: boolean;
    inputsValidStatuses = {};

    @ViewChildren(InlineEditComponent) inlineForms;
    @ViewChildren(InlineAutoInstituteComponent) inlineAutoInstitutes;
    @ViewChildren(InlineEditSelectComponent) inlineFormSelect;


    constructor(private readonly accessionService: AccessionService) { }

    ngOnChanges(changes: SimpleChanges): void {

        if ('instituteCode' in changes || 'germplasmNumber' in changes) {
            this.accessionService.retrieve(changes['instituteCode'].currentValue,
                                           changes['germplasmNumber'].currentValue)
                .subscribe((accession: Accession) => {
                    this.accession = accession;
                });
        }
    }
    resetForm() {
        this.editMode = false;
        this.inlineForms.map(inlineForm => inlineForm.resetForm());
        this.inlineAutoInstitutes.map(inlineForm => inlineForm.resetForm());
        this.inlineFormSelect.map(inlineForm => inlineForm.resetForm());
    }
    getFormValidData() {
        const formValidData = {};
        this.inlineAutoInstitutes.map(inlineForm => {
            formValidData[inlineForm.config.name] = inlineForm.getValueIfFormValid();
        });
        this.inlineFormSelect.map(inlineForm => {
            formValidData[inlineForm.config.name] = inlineForm.getValueIfFormValid();
        });
        return formValidData;
    }
    updateAccession() {
        const formValidData = this.getFormValidData();
        console.log(formValidData);
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
}
