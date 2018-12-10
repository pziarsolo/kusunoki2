import {Component, EventEmitter, Input, OnInit, Output, QueryList,
        ViewChildren, AfterViewChecked} from '@angular/core';

import { AppUrls } from 'src/app/pages/appUrls';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { InlineAutoInstituteComponent } from 'src/app/pages/accession/inline-auto-institute/inline-auto-institute.component';
import { InlineEditSelectComponent } from '../inline-edit-select/inline-edit-select.component';
import { InlineAutoCountryComponent } from 'src/app/pages/accession/inline-auto-country/inline-auto-country.component';


@Component({
    selector: 'kusunoki2-base-inlines-form2',
    templateUrl: './base-inlines-form2.component.html',
  })
export class BaseInlinesForm2Component implements OnInit, AfterViewChecked {
    @Input() input_form_data: any;
    @Input() editMode: boolean;
    @Input() createMode = false;
    @Input() componentId: string;

    @Output() validationStateEvent = new EventEmitter<any>();

    appUrls = AppUrls;
    allInputAreValid: boolean;
    inputsValidStatuses = {};

    @ViewChildren(InlineEditComponent) inlineForms;
    @ViewChildren(InlineAutoInstituteComponent) inlineAutoInstitutes;
    @ViewChildren(InlineAutoCountryComponent) inlineAutoCountry;
    @ViewChildren(InlineEditSelectComponent) inlineFormSelect;

    childrenComponents: any[];

    childrenConfig = {};

    makeAllFieldEditable() {
        for (const child of Object.keys(this.childrenConfig)) {
            this.childrenConfig[child]['is_editable'] = true;
         }
    }
    ngOnInit() {
        if (this.createMode === true) {
            this.makeAllFieldEditable();
        }
    }

    ngAfterViewChecked() {
        this.childrenComponents = this.inlineForms.toArray();
        this.childrenComponents = this.childrenComponents.concat(
            this.inlineAutoInstitutes.toArray());
        this.childrenComponents = this.childrenComponents.concat(
            this.inlineFormSelect.toArray());
        this.childrenComponents = this.childrenComponents.concat(
                this.inlineAutoCountry.toArray());
    }

    checkAllInputAreValid() {
        return  Object.keys(this.inputsValidStatuses)
            .map(k => this.inputsValidStatuses[k])
            .every(v => v);
    }

    checkFormValid(event) {
        Object.assign(this.inputsValidStatuses, event);
        this.allInputAreValid = this.checkAllInputAreValid();
        const id = this.componentId;
        this.validationStateEvent.emit({id: this.allInputAreValid});
    }

    getValueIfFormValid() {
        if (this.allInputAreValid) {
            const validFormData = {};
            for (const component of this.childrenComponents) {
                const value = component.getValueIfFormValid();
                if (value !== undefined) {
                    validFormData[component.config.name] = value;
                }
            }
            return validFormData;
        }
    }
    clearForm() {
        for (const children of this.childrenComponents) {
            children.clearForm();
        }
    }
    resetForm() {
        for (const children of this.childrenComponents) {
            children.resetForm();
        }
        this.editMode = false;
    }
}
