import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export const passwordsEqualValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const pass1 = control.get('password').value;
    const pass2 = control.get('password2').value;
    return pass1 && pass2 && pass1 !== pass2 ? {'passwordsEqual': true} : null;
};
