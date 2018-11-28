import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {map} from 'rxjs/operators';

import { ApiUrls } from './apiUrls';
import { JWTRaw } from '../entities/jwtToken.model';
import { JwtService } from './jwt.service';
import { CurrentUserService } from './current-user.service';



@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token_create_url = ApiUrls.tokenCreate;

    constructor(private http: HttpClient,
                private router: Router,
                private jtwService: JwtService,
                private currentUser: CurrentUserService) {}


    login(username: string, password: string) {
        return this.http.post(this.token_create_url, {'username': username,
                                                      'password': password})
            .pipe(
                map(
                    (jwtSimple: JWTRaw) => {
                        this.jtwService.saveToken(jwtSimple);
                        this.currentUser.setUser(this.jtwService.getToken());
                        return true;
                    },
                    error => {
                        this.currentUser.unsetUser();
                        return false;
                    }
                )
            );
    }

    logout() {
        this.currentUser.unsetUser();
        this.router.navigateByUrl('/');
    }
}
