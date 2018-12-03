import { ValidatorFn, AsyncValidator, ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GroupService } from '../services/group.service';

@Injectable({ providedIn: 'root' })
export class GroupExistValidator implements AsyncValidator {
    constructor(private groupService: GroupService) {}

    validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const groupname = ctrl.value;
        return this.groupService.groupExists(groupname).pipe(
            map(groupExist => (groupExist ? {'groupExist': true} : null)),
            catchError(() => null)
        );
    }
}
