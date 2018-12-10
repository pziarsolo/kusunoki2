import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { Accession } from '../entities/accession.model';
import { paramsToHttpParams } from './utils';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AccessionService {
    endPoint = ApiUrls.accessions;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(instituteCode: string, germplasmNumber: string): string {
        return `${this.endPoint}${instituteCode}:${germplasmNumber}/`;
    }

    retrieve(instituteCode: string, germplasmNumber: string): Observable<Accession> {
        const detailUrl = this.composeDetailUrl(instituteCode, germplasmNumber);
        return this.http.get<Accession>(detailUrl)
            .pipe(
                map(item => new Accession(item))
            );
    }

    list(searchParams): Observable<HttpResponse<Accession[]>> {
        const get_params = paramsToHttpParams(searchParams);
        return this.http.get<Accession[]>(this.endPoint,
            {params: get_params, observe: 'response'});
    }

    update(instituteCode: string, germplasmNumber: string, accession): Observable<Accession> {
        const detailUrl = this.composeDetailUrl(instituteCode, germplasmNumber);
        return this.http.put<Accession>(detailUrl, accession)
            .pipe(
                map(item => new Accession(item))
            );
    }

    delete(instituteCode: string, germplasmNumber: string) {
        const detailUrl = this.composeDetailUrl(instituteCode, germplasmNumber);
        return this.http.delete(detailUrl);
    }

    create(accession): Observable<Accession> {
        return this.http.post<Accession>(this.endPoint, accession)
            .pipe(
                map(item => new Accession(item))
            );
    }
}
