import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { JWTUser } from '../../../shared/entities/jwtToken.model';
import { AppUrls } from '../../appUrls';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';


@Component({
    selector: 'kusunoki2-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
    user: Observable<JWTUser>;
    appUrls = AppUrls;
    constructor(
        private router: Router,
        private authService: AuthService,
        private currentUserService: CurrentUserService) {}

    ngOnInit(): void {
        this.user = this.currentUserService.userToken;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
