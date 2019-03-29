import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Task } from '../entities/task.model';
import { Scale } from '../entities/scale.model';


@Injectable({
    providedIn: 'root'
})
export class ScaleService {
    endPoint = ApiUrls.scales;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(scaleName: string): string {
        return `${this.endPoint}${scaleName}/`;
    }

    retrieve(scaleName: string, searchParams?): Observable<Scale> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(scaleName);
        return this.http.get<Scale>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<Scale[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<Scale[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(scale: Scale): Observable<Scale> {
        return this.http.post<Scale>(this.endPoint, scale);
    }

    update(scaleName: string, scale: Scale): Observable<Scale> {
        const detailUrl = this.composeDetailUrl(scaleName);
        return this.http.put<Scale>(detailUrl, scale);
    }

    delete(scaleName: string): Observable<any> {
        const detailUrl = this.composeDetailUrl(scaleName);
        return this.http.delete(detailUrl);
    }

    bulkCreate(file: File): Observable<HttpEvent<Task>> {
        const bulk_url = this.endPoint + 'bulk/';

        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

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
