import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Institute } from '../entities/institute.model';
import { DataSource } from '../entities/data_source.model';
import { Task } from '../entities/task.model';


@Injectable({
    providedIn: 'root'
})
export class InstituteService {
    endPoint = ApiUrls.institutes;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(instituteCode): string {
        return `${this.endPoint}${instituteCode}/`;
    }

    retrieve(instituteCode: string, searchParams?): Observable<Institute> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(instituteCode);
        return this.http.get<Institute>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<Institute[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<Institute[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(institute: Institute): Observable<Institute> {
        return this.http.post<Institute>(this.endPoint, institute);
    }

    update(instituteCode: string, institute: Institute): Observable<Institute> {
        const detailUrl = this.composeDetailUrl(instituteCode);
        return this.http.put<Institute>(detailUrl, institute);
    }

    delete(instituteCode: string): Observable<any> {
        const detailUrl = this.composeDetailUrl(instituteCode);
        return this.http.delete(detailUrl);
    }

    bulkCreate(file: File): Observable<HttpEvent<Task>> {
        const bulk_url = this.endPoint + 'bulk/';

        const formData: FormData = new FormData();
        formData.append('csv', file, file.name);

        const req = new HttpRequest('POST', bulk_url, formData,
                                    {reportProgress: true});

        return this.http.request(req);
    }
}
