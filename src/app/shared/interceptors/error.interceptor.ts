import { Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import {throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';

import { Location } from '@angular/common';
import { StatusService } from '../StatusModule/status.service';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private status_service: StatusService,
                private router: Router,
                private location: Location,
                private currentUserService: CurrentUserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((response: any) => {
                if (response.error instanceof ErrorEvent) {
                    console.log('An error occurred:', response.error.message);
                } else {
                    let body: object = null;
                    const message = response.message;

                    try {
                        body = response.error.detail;
                    } catch (e) {
                        body = null;
                    }
                    console.log(response);
                    console.log(`ERROR:  ${message}, status: ${response.status}, message: ${body}`);
                    if (response.status === 0) {
                        this.status_service.info('Did not receive response from server');
                    } else if (response.status === 401) {
                        if (String(body) === 'Given token not valid for any token type') {
                            // this.currentUserService.unsetUser();
                        }
                        this.status_service.info('Not authorized');

                    } else if (response.status === 403) {
                        this.status_service.info('Not Allowed');
                    } else if (response.status === 404) {
                        this.status_service.error('Error 404: Not Found');
                    } else if (response.status === 400) {
                        this.status_service.error(`${body}`);
                    } else if (response.status === 500) {
                        this.status_service.error(`Server Error: ${body}`);
                    }
                }
                // siempre devuelvo el error por si el que hace la peticion
                // lo quiere pillar
                return observableThrowError(response);
            }));
    }
}
