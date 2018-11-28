import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import { ApiUrls } from '../services/apiUrls';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    public constructor(private currentUserService: CurrentUserService) {}

    public intercept(request: HttpRequest<any>,
                     next: HttpHandler): Observable<HttpEvent<any>> {
        const url = request.url;
        // do not add header if we are requesting token
        if (url.indexOf(ApiUrls.tokenCreate) !== -1) {
            return next.handle(request);
        }
        const userToken = this.currentUserService.currentUserSubject.value;
        if (this.currentUserService.isAuthenticated()) {
            request = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + userToken.accessToken)
            });
        }
        return next.handle(request);

        // return this.currentUserService.userToken
        //     .pipe(
        //         switchMap((userToken: JWTUser) => {
        //             if (userToken.isAuthenticated) {
        //                 console.log('authenticated');
        //                 request = request.clone({
        //                     headers: request.headers.set('Authorization', 'Bearer ' + userToken.accessToken)
        //                 });
        //             }
        //             console.log('aaa', request);
        //             return next.handle(request);
        //         })
        //     );

    }
}

