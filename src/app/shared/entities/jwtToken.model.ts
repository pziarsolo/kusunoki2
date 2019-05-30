export class JwtHelper {
    private urlBase64Decode(str: string) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                // tslint:disable-next-line:no-string-throw
                throw 'Illegal base64url string!';
        }
        return decodeURIComponent((<any>window).escape(window.atob(output)));
    }

    public decodeToken(token: string = '') {
        if (token === null || token === '') { return { 'upn': '' }; }
        const parts = token.split('.');
        if (parts.length !== 3) {

            throw new Error('JWT must have 3 parts');
        }
        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    }
}

export interface JWTRaw {
    access: string;
    refresh: string;
}

export class JWTUser {
    _accessToken: string;
    refreshToken: string;
    decodedToken;
    rawToken: JWTRaw;

    constructor(token?: JWTRaw) {
        if (token) {
            this.rawToken = token;
            this.accessToken = token.access;
            this.refreshToken = token.refresh;
        } else {
            this.rawToken = undefined;
            this.accessToken = undefined;
            this.refreshToken = undefined;
        }
    }

    set accessToken(access_token) {
        this._accessToken = access_token;
        if (access_token) {
            const jwtHelper = new JwtHelper();
            this.decodedToken = jwtHelper.decodeToken(this.accessToken);
        }

    }

    get accessToken() {
        return this._accessToken;
    }

    get isAuthenticated() {
        return Boolean(this._accessToken);
    }

    get userId() {
        return this.decodedToken['user_id'];
    }
    get username() {
        return this.decodedToken['username'];
    }
    get groups() {
        return this.decodedToken['groups'];
    }
    get jti() {
        return this.decodedToken['jti'];
    }
    get is_staff() {
        return this.decodedToken['is_staff'];
    }
    get expirationTime() {
        return this.decodedToken['exp'];
    }
}
