import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Task } from '../entities/task.model';
import { Observation } from '../entities/observation.model';


@Injectable({
    providedIn: 'root'
})
export class ObservationService {
    endPoint = ApiUrls.observations;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(observation_id: number): string {
        return `${this.endPoint}${observation_id}/`;
    }

    retrieve(observation_id: number, searchParams?): Observable<Observation> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(observation_id);
        return this.http.get<Observation>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<Observation[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<Observation[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(observation: Observation): Observable<Observation> {
        return this.http.post<Observation>(this.endPoint, observation);
    }

    update(observation_id: number, observation: Observation): Observable<Observation> {
        const detailUrl = this.composeDetailUrl(observation_id);
        return this.http.put<Observation>(detailUrl, observation);
    }

    delete(observation_id: number): Observable<any> {
        const detailUrl = this.composeDetailUrl(observation_id);
        return this.http.delete(detailUrl);
    }

    bulkCreate(file: File, conf: any): Observable<HttpEvent<Task>> {
        console.log(conf);
        const bulk_url = this.endPoint + 'bulk/';

        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        for (const key of Object.keys(conf)) {
            formData.append(key, conf[key]);
        }

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
