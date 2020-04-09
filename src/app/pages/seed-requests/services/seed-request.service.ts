import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiUrls } from '../../../shared/services/apiUrls';
import { paramsToHttpParams } from '../../../shared/services/utils';
import { SeedRequest } from '../entities/seed_request.model';


@Injectable({
    providedIn: 'root'
})
export class SeedRequestService {
    endPoint = ApiUrls.seed_requests;
    private httpOptions: {
        headers: HttpHeaders
    };
    constructor(private http: HttpClient) {}

    private composeDetailUrl(requestUid): string {
        return `${this.endPoint}${requestUid}/`;
    }

    retrieve(requestUid: string, searchParams?): Observable<SeedRequest> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(requestUid);
        return this.http.get<SeedRequest>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<SeedRequest[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<SeedRequest[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(seedRequest, reCaptchaToken?: string): Observable<SeedRequest[]> {
        if (reCaptchaToken !== undefined) {
            this.httpOptions = {
                headers: new HttpHeaders({'reCaptchaToken': reCaptchaToken})
            };
        } else {
            this.httpOptions = null;
        }

        return this.http.post<SeedRequest[]>(this.endPoint, seedRequest,
                                             this.httpOptions);
    }

    delete(requestUid: string): Observable<any> {
        const detailUrl = this.composeDetailUrl(requestUid);
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
