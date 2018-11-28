import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export function isNumberValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const value_ = Number(control.value);
        const is_number = !isNaN(value_);
      return !is_number ? {'is_not_number': {value: control.value}} : null;
    };
}
