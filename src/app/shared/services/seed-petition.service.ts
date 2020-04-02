import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Study } from '../entities/study.model';
import { Task } from '../entities/task.model';
import { SeedPetition } from '../entities/seed_petition.model';


@Injectable({
    providedIn: 'root'
})
export class SeedPetitionService {
    endPoint = ApiUrls.seed_petitions;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(petitionId): string {
        petitionId = String(petitionId);
        return `${this.endPoint}${petitionId}/`;
    }

    retrieve(petitionId: number, searchParams?): Observable<SeedPetition> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(petitionId);
        return this.http.get<SeedPetition>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<SeedPetition[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<SeedPetition[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(seedPetition): Observable<SeedPetition> {
        return this.http.post<SeedPetition>(this.endPoint, seedPetition);
    }

    delete(petitionId: number): Observable<any> {
        const detailUrl = this.composeDetailUrl(petitionId);
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
