import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Study } from '../entities/study.model';
import { Task } from '../entities/task.model';


@Injectable({
    providedIn: 'root'
})
export class StudyService {
    endPoint = ApiUrls.studies;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(studyName): string {
        return `${this.endPoint}${studyName}/`;
    }

    retrieve(studyName: string, searchParams?): Observable<Study> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(studyName);
        return this.http.get<Study>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<Study[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<Study[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(study): Observable<Study> {
        return this.http.post<Study>(this.endPoint, study);
    }

    update(studyName: string, study): Observable<Study> {
        const detailUrl = this.composeDetailUrl(studyName);
        return this.http.put<Study>(detailUrl, study);
    }

    delete(studyName: string): Observable<any> {
        const detailUrl = this.composeDetailUrl(studyName);
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

    downloadCsv(searchParams?, csvHeader?): Observable<Blob> {
        if (!searchParams) {
            searchParams = {};
        }
        searchParams['format'] = 'csv';
        if (csvHeader !== undefined && csvHeader === false) {
            searchParams['format'] = 'csv_no_header';
        }
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get(this.endPoint, {params: getParams,
                                             responseType: 'blob' });

    }
}
