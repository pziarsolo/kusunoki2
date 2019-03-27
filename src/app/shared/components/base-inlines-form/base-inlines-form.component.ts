import {Component, EventEmitter, Input, OnInit, Output, QueryList,
        ViewChildren, AfterViewChecked} from '@angular/core';

import { AppUrls } from 'src/app/pages/appUrls';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';



@Component({
    selector: 'kusunoki2-base-inlines-form',
    templateUrl: './base-inlines-form.component.html',
  })
export class BaseInlinesFormComponent implements OnInit, AfterViewChecked {
    model_name = 'base';
    output_data_type = undefined;
    appUrls = AppUrls;
    form_valid: boolean;

    @Input() input_form_data: any;
    @Input() edit_mode: boolean;
    @Input() create_mode = false;
    @Output() validation_state_event = new EventEmitter<any>();


    children_components: any[];

    @ViewChildren(InlineEditComponent)
    inline_children: QueryList<InlineEditComponent>;

    children_config = {};

    form_valid_status = {};

    constructor() { }

    make_all_field_editable() {
        for (const child of Object.keys(this.children_config)) {
            this.children_config[child]['is_editable'] = true;
         }
    }
    ngOnInit() {
        if (this.create_mode === true) {
            this.make_all_field_editable();
        }
        this.afterInit();
    }

    afterInit() {}

    ngAfterViewChecked() {
        this.children_components = this.inline_children.toArray();
        this.afterAfterViewChecked();
    }

    afterAfterViewChecked() {}

    all_children_are_valid() {
        return  Object.keys(this.form_valid_status)
                    .map(k => this.form_valid_status[k])
                    .every(v => v);
    }

    on_successful_validation(event) {}

    check_form_valid(event) {
        Object.assign(this.form_valid_status, event);
        const are_all_valid = this.all_children_are_valid();
        this.form_valid = are_all_valid;
        if (are_all_valid) {
            this.on_successful_validation(event);
        }
        this.validation_state_event.emit({[this.model_name]: are_all_valid});
    }

    _getFormDataIfValid() {
        if (this.all_children_are_valid()) {
            const valid_form_data = {};
            for (const component of this.children_components) {
                const value = component.getValueIfFormValid();
                if (value !== undefined) {
                    valid_form_data[component.config.name] = value;
                }
            }
            return valid_form_data;
        }
    }

    getFormDataIfValid() {
        const data = this._getFormDataIfValid();
        if (this.output_data_type === undefined) {
            return data;
        } else {
            return new this.output_data_type(data);
        }
    }

    formReset() {
        for (const children of this.children_components) {
            children.resetForm();
        }
        this.edit_mode = false;
    }
}
