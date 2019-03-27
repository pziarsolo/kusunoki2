import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Task } from '../entities/task.model';
import { Trait } from '../entities/trait.model';


@Injectable({
    providedIn: 'root'
})
export class TraitService {
    endPoint = ApiUrls.traits;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(traitName: string): string {
        return `${this.endPoint}${traitName}/`;
    }

    retrieve(traitName: string, searchParams?): Observable<Trait> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(traitName);
        return this.http.get<Trait>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<Trait[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<Trait[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(trait: Trait): Observable<Trait> {
        return this.http.post<Trait>(this.endPoint, trait);
    }

    update(traitName: string, trait: Trait): Observable<Trait> {
        const detailUrl = this.composeDetailUrl(traitName);
        return this.http.put<Trait>(detailUrl, trait);
    }

    delete(traitName: string): Observable<any> {
        const detailUrl = this.composeDetailUrl(traitName);
        return this.http.delete(detailUrl);
    }

    bulkCreate(file: File): Observable<HttpEvent<Task>> {
        const bulk_url = this.endPoint + 'create_by_obo/';

        const formData: FormData = new FormData();
        formData.append('obo', file, file.name);

        const req = new HttpRequest('POST', bulk_url, formData,
                                    {reportProgress: true});

        return this.http.request(req);
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
