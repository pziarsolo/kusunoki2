import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Country } from '../entities/country.model';


@Injectable({
    providedIn: 'root'
})
export class CountryService {
    endPoint = ApiUrls.countries;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(code): string {
        return `${this.endPoint}${code}/`;
    }

    retrieve(code: string): Observable<Country> {
        const detailUrl = this.composeDetailUrl(code);
        return this.http.get<Country>(detailUrl);
    }

    list(searchParams?): Observable<HttpResponse<Country[]>> {
        const get_params = paramsToHttpParams(searchParams);
        return this.http.get<Country[]>(this.endPoint,
            {params: searchParams, observe: 'response'});
    }
}
