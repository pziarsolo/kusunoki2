import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SubscriptionLike as ISubscription} from 'rxjs';
import { isNumberValidator } from '../../validators/isNumber.validator';


@Component({
    selector: 'kusunoki2-inline-edit',
    templateUrl: './inline-edit.component.html',
    styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit, OnDestroy {
    @Input() edit_mode: boolean;
    private _value;
    @Input()
    set value(value) {
        this._value = value;
        this.valueChange.emit(value);
    }
    @Input() config: any;
    @Input() selected: any;
    @Output() valueChange = new EventEmitter();
    get value() {
        return this._value;
    }
    @Output() validation_state_event = new EventEmitter<any>();
    initial_value: any;
    form_changes: ISubscription;
    form: FormGroup;
    input_control: FormControl;

    constructor() { }

    ngOnInit() {
        this.set_config_default_values();
        this.input_control = new FormControl(this.value,
                                             this.config.validators);
        this.form = new FormGroup({});
        this.form.addControl('input_control', this.input_control);

        this.validation_state_event.emit({[this.config.name]: this.form.valid});
        if (this.config.widget && this.config.widget.type === 'select' && this.value) {

            this.selected = this.config.widget.conf.choices.filter(item => item.code === Number(this.value) || item.code === this.value)[0];
        }
        this.subscribeToFormChanges();
        this.after_init();
        this.initial_value = this.value;
    }

    after_init() {}

    ngOnDestroy() {
        this.form_changes.unsubscribe();
        this.afterOnDestroy();
    }
    afterOnDestroy() {}

    clearForm() {
        this.form.reset({'input_control': ''});
    }

    resetForm() {
        this.input_control.patchValue(this.initial_value);
    }

    hideForm() {
        let has_value: boolean;
        if (this.value === undefined || this.value === null || this.value === '') {
            has_value = false;
        } else {
            has_value = true;
        }
        return (!has_value && !this.edit_mode);
    }
    hideInput() {
        if (!this.config.is_editable) {
            return true;
        } else {
            return !this.edit_mode;
        }
    }
    isInputVisible() {
        if (this.config.is_editable && this.edit_mode) {
            return false;
        } else {
            return true;
        }
    }
    set_config_default_values() {
        if (this.config.is_editable === undefined) {
            this.config.is_editable = true;
        }
        if (this.config.type === undefined) {
            this.config.type = String;
        }
        if (this.config.validators === undefined) {
            this.config.validators = [];
        }
        if (this.config.is_required === undefined) {
            this.config.is_required = false;
        }
        if (this.config.is_required) {
            this.config.validators.push(Validators.required);
        }
        if (this.config.type === Number) {
            this.config.validators.push(isNumberValidator());
        }
        if (this.config.text_input_type === undefined) {
            this.config.text_input_type = 'text';
        }
        if (this.config.widget === undefined) {
            this.config.widget = {type: 'text_input'};
        }
        if (this.config.widget.type === 'switch') {
            this.config.type = Boolean;
        }
        if (this.config.widget.type === 'datePicker') {
            this.config.type = Date;
        }
        if (this.config.widget.type === 'select') {
            this.config.type = Object;
        }

    }

    subscribeToFormChanges() {
        this.form_changes = this.form.valueChanges.subscribe(changes => {
            this.validation_state_event.emit({[this.config.name]: this.form.valid});
            this.value = changes['input_control'];
        });
    }

    getFormDataIfValid() {
        if (this.form.valid) {
            if (this.input_control.value !== null &&
                this.input_control.value !== undefined &&
                this.input_control.value !== 'null') { // this last one is to reset select widtget value
                return new this.config.type(this.input_control.value);
            }
        }
    }
    isSameObjectByCode(o1: any, o2: any): boolean {
        if (o1 && o2) {
            return o1.code === o2.code;
        }
        return false;
    }
}

