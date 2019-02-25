import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Task } from '../entities/task.model';
import { ObservationVariable } from '../entities/onservation_variable.model';


@Injectable({
    providedIn: 'root'
})
export class ObservationVariableService {
    endPoint = ApiUrls.observationVariables;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(observationVariableName: string): string {
        return `${this.endPoint}${observationVariableName}/`;
    }

    retrieve(observationVariableName: string, searchParams?): Observable<ObservationVariable> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(observationVariableName);
        return this.http.get<ObservationVariable>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<ObservationVariable[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<ObservationVariable[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(observationVariable: ObservationVariable): Observable<ObservationVariable> {
        return this.http.post<ObservationVariable>(this.endPoint, observationVariable);
    }

    update(observationVariableName: string, observationVariable: ObservationVariable): Observable<ObservationVariable> {
        const detailUrl = this.composeDetailUrl(observationVariableName);
        return this.http.put<ObservationVariable>(detailUrl, observationVariable);
    }

    delete(observationVariableName: string): Observable<any> {
        const detailUrl = this.composeDetailUrl(observationVariableName);
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
