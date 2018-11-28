/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {ApiUrlInterceptor} from './apiurl.interceptor';
import {AuthInterceptor} from './auth.interceptor';
import {HttpErrorInterceptor} from './error.interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    // { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];
