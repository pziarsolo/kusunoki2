import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

    public constructor() {
    }

    public intercept(req: HttpRequest<any>,
                     next: HttpHandler): Observable<HttpEvent<any>> {

        const clonedRequest: HttpRequest<any> = req.clone({
            url: environment.apiUrl + req.url
        });

        return next.handle(clonedRequest);
    }
}
