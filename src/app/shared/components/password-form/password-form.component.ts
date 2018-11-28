import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SubscriptionLike as ISubscription , Observable} from 'rxjs';
import { passwordsEqualValidator } from '../../validators/passwords.validator';


@Component({
  selector: 'kusunoki2-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
    password: FormControl;
    password2: FormControl;
    form: FormGroup;
    form_changes: ISubscription;
    @Output() validation_state_event = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        this.password =  new FormControl();
        this.password2 =  new FormControl();
        this.form = new FormGroup({'password': this.password,
                                   'password2': this.password2},
                                  {validators: passwordsEqualValidator});
        this.validation_state_event.emit({['password']: this.form.valid});
        this.validation_state_event.emit({['password2']: this.form.valid});

    }

    clearForm() {
        this.form.reset({'password': '', 'password2': ''});
    }

    getFormDataIfValid() {
        if (this.form.valid) {
            if (this.password.value !== null) {
                return this.password.value;
            }
        }
    }
}
