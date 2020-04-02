import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { RouterExtService } from 'src/app/shared/services/router-extension.service';


@Component({
    selector: 'kusunoki2-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
    login_form: FormGroup;
    username: FormControl;
    password: FormControl;
    returnUrl: string;
    errorMsg: string;
    hide: Boolean = true;
    constructor(private router: Router,
                private auth_service: AuthService,
                private status_service: StatusService,
                private routerExt: RouterExtService) {
    }

    createFormControls() {
        this.username = new FormControl('', [Validators.required]);
        this.password = new FormControl('', [Validators.required]);
    }

    createForm() {
        this.login_form = new FormGroup({
            username: this.username,
            password: this.password}
        );
    }

    ngOnInit() {
        // this.auth_service.logout();
        this.createFormControls();
        this.createForm();
        this.returnUrl = this.routerExt.getPreviousUrl(); // this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onLogin() {
        if (this.login_form.valid) {
            this.auth_service.login(this.username.value, this.password.value)
                .subscribe(
                    () => {
                        console.log(this.returnUrl);
                        this.router.navigateByUrl(this.returnUrl);
                    },
                    error => {
                        this.errorMsg = error.error.non_field_errors[0];
                        this.status_service.error(this.errorMsg);
                    }
                );
        }
    }
}
