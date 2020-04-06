import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { SeedPetition } from '../entities/seed_petition.model';


@Injectable({
    providedIn: 'root'
})
export class SeedPetitionService {
    endPoint = ApiUrls.seed_petitions;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(petitionUid): string {
        return `${this.endPoint}${petitionUid}/`;
    }

    retrieve(petitionUid: string, searchParams?): Observable<SeedPetition> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(petitionUid);
        return this.http.get<SeedPetition>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<SeedPetition[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<SeedPetition[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(seedPetition): Observable<SeedPetition[]> {
        return this.http.post<SeedPetition[]>(this.endPoint, seedPetition);
    }

    delete(petitionUid: string): Observable<any> {
        const detailUrl = this.composeDetailUrl(petitionUid);
        return this.http.delete(detailUrl);
    }

    downloadCsv(searchParams?): Observable<Blob> {
        if (!searchParams) {
            searchParams = {};
        }
        searchParams['format'] = 'csv';
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get(this.endPoint, {params: getParams,
                                             responseType: 'blob' });

    }
}
