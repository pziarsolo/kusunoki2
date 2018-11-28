import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { JwtService } from './jwt.service';
import { JWTRaw, JWTUser } from '../entities/jwtToken.model';


@Injectable({
    providedIn: 'root',
})
export class CurrentUserService {
    public currentUserSubject = new BehaviorSubject<JWTUser>({} as JWTUser);
    public userToken = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    rawToken: JWTRaw;

    constructor(private jwtService: JwtService) {
        this.populate();
    }

    populate() {
        // If JWT detected, attempt to get & store user's info
        const token = this.jwtService.getToken();
        if (token) {
            this.setUser(token);
        } else {
          // Remove any potential remnants of previous auth states
          this.unsetUser();
        }
    }
    setUser(jwtToken: JWTRaw ) {
        this.rawToken = jwtToken;
        this.jwtService.saveToken(jwtToken);
        const userToken = new JWTUser(jwtToken);
        // Set current user data into observable
        this.currentUserSubject.next(userToken);
    }

    unsetUser() {
        this.rawToken = undefined;
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as JWTUser);
    }

    isAuthenticated() {
        const token = this.jwtService.getToken();
        if (token) {
            return true;
        } else {
            this.unsetUser();
            return false;
        }
    }
}
