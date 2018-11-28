import { Injectable } from '@angular/core';
import { JwtHelper, JWTRaw } from '../entities/jwtToken.model';


@Injectable({
    providedIn: 'root',
})
export class JwtService {

    constructor() {}

    private checkJWTTokenAndRemoveIfBad() {
        const stringifyToken = localStorage.getItem('jwtToken');

        if (stringifyToken) {
            const token = JSON.parse(stringifyToken);
            const jwtHelper = new JwtHelper();
            try {
                const decodedToken = jwtHelper.decodeToken(token['access']);
                const secondsNow = new Date().getTime() / 1000;
                if (decodedToken.exp < secondsNow) {
                    console.log('destroy');
                    this.destroyToken();
                }
            } catch {
                this.destroyToken();
            }
        }
    }

    getToken() {
        this.checkJWTTokenAndRemoveIfBad();
        const stringifyToken = localStorage.getItem('jwtToken');
        let token;
        if (stringifyToken) {
            token = JSON.parse(stringifyToken);
        } else {
            token = undefined;
        }

        return token;
    }

    saveToken(token: JWTRaw) {
        localStorage.setItem('jwtToken', JSON.stringify(token));
    }

    destroyToken() {
        localStorage.removeItem('jwtToken');
    }
}
