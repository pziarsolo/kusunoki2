import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule { }
