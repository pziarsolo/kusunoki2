import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SubscriptionLike as ISubscription } from 'rxjs';
import { isNumberValidator } from '../../validators/isNumber.validator';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/M/D',
  },
  display: {
    dateInput: 'YYYY/M/D',
    monthYearLabel: 'YYYY/M/D',
    dateA11yLabel: 'YYYY/M/D',
    monthYearA11yLabel: 'YYYY/M/D',
  },
};

@Component({
    selector: 'kusunoki2-inline-edit',
    templateUrl: './inline-edit.component.html',
    styleUrls: ['./inline-edit.component.scss'],
    providers: [
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
      ],
})
export class InlineEditComponent implements OnInit, OnDestroy {
    @Input() editMode: boolean;
    @Input() label: string;
    @Input() config: any;

    // with  this set/get we convert value ina two way binding model like
    private _value;
    @Input()
    set value(value) {
        this._value = value;
        this.valueChange.emit(value);
    }
    @Output() valueChange = new EventEmitter();
    get value() {
        return this._value;
    }

    @Output() validationStateEvent = new EventEmitter<any>();

    initialValue: any;
    inputChanges: ISubscription;

    form: FormGroup;
    inputControl: FormControl;

    constructor() {}

    setInitialValue() {
        if (this.value === undefined || this.value === null) {
            this.initialValue = this.value;
        } else {
            this.initialValue = this.value;
        }

    }
    ngOnInit() {
        this.setInitialValue();
        this.setConfigDefaultValues();
        this.inputControl = new FormControl(this.value,
                                            this.config.validators);
        this.form = new FormGroup({});
        this.form.addControl('inputControl', this.inputControl);
        this.validationStateEvent.emit({[this.config.name]: this.inputControl.valid});
        this.subscribeToInputChanges();
        this.afterOnInit();
    }

    subscribeToInputChanges() {
        this.inputChanges = this.inputControl.valueChanges
            .subscribe(val => {
                const isValid = this.inputControl.valid;
                // console.log({[this.config.name]: isValid}, this.form.valid);
                // console.log(this.inputControl.errors);
                // console.log(this.inputControl.value);
                this.validationStateEvent.emit({[this.config.name]: isValid});
                this.value = val;
            });
    }
    afterOnInit() {}

    ngOnDestroy() {
        this.inputChanges.unsubscribe();
        this.afterOnDestroy();
    }
    afterOnDestroy() {}

    clearForm() {
        this.inputControl.patchValue('');
    }

    resetForm() {
        this.inputControl.patchValue(this.initialValue);
        this.validationStateEvent.emit({[this.config.name]: this.inputControl.valid});
    }

    hideForm() {
        let has_value: boolean;
        if (this.value === undefined || this.value === null || this.value === '') {
            has_value = false;
        } else {
            has_value = true;
        }
        const hide = (!has_value && !this.editMode);

        return  hide;
    }
    hideInput() {
        if (!this.config.is_editable) {
            return true;
        } else {
            return !this.editMode;
        }
    }
    isInputVisible() {
        if (this.config.is_editable && this.editMode) {
            return false;
        } else {
            return true;
        }
    }
    setConfigDefaultValues() {
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
    }

    getValueIfFormValid() {
        if (this.inputControl.valid) {
            if (this.inputControl.value !== null &&
                this.inputControl.value !== undefined &&
                this.inputControl.value !== 'null') { // this last one is to reset select widtget value
                return this.inputControl.value;
            }
        }
    }
}

