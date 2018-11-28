import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kusunoki2-user-change-password-dialog',
  templateUrl: './user-change-password-dialog.component.html',
  styleUrls: ['./user-change-password-dialog.component.scss']
})
export class UserChangePasswordDialogComponent {
    pass1: string;
    pass2: string;
    isPasswordOk: Boolean = false;
    hide1: Boolean = true;
    hide2: Boolean = true;
    constructor() { }

    checkPasswords() {
        if (this.pass1 && this.pass2) {
            if (this.pass1.length > 5 && this.pass1 === this.pass2) {
                this.isPasswordOk = true;
            } else {
                this.isPasswordOk = false;
            }
        } else {
            this.isPasswordOk = false;
        }
    }


}
