import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiUrls } from './apiUrls';
import { AccessionSet } from '../entities/accessionset.model';
import { paramsToHttpParams } from './utils';
import { Task } from '../entities/task.model';


@Injectable({
    providedIn: 'root',
})
export class AccessionSetService {
    endPoint = ApiUrls.accessionsets;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(instituteCode: string, accessionsetNumber: string): string {
        return `${this.endPoint}${instituteCode}:${accessionsetNumber}/`;
    }

    retrieve(instituteCode: string, accessionsetNumber: string): Observable<AccessionSet> {
        const detailUrl = this.composeDetailUrl(instituteCode, accessionsetNumber);
        return this.http.get<AccessionSet>(detailUrl)
            .pipe(
                map(item => new AccessionSet(item))
            );
    }

    list(searchParams): Observable<HttpResponse<AccessionSet[]>> {
        const get_params = paramsToHttpParams(searchParams);
        return this.http.get<AccessionSet[]>(this.endPoint,
            {params: get_params, observe: 'response'});
    }

    delete(instituteCode: string, accessionsetNumber: string) {
        const detailUrl = this.composeDetailUrl(instituteCode, accessionsetNumber);
        return this.http.delete(detailUrl);
    }

    create(accessionset): Observable<AccessionSet> {
        return this.http.post<AccessionSet>(this.endPoint, accessionset)
            .pipe(
                map(item => new AccessionSet(item))
            );
    }
    update(instituteCode: string, accessionsetNumber: string, accessionset): Observable<AccessionSet> {
        const detailUrl = this.composeDetailUrl(instituteCode, accessionsetNumber);
        return this.http.put<AccessionSet>(detailUrl, accessionset)
            .pipe(
                map(item => new AccessionSet(item))
            );
    }

    bulkCreate(file): Observable<HttpEvent<Task>> {
        const bulkUrl = this.endPoint + 'bulk/';

        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        const req = new HttpRequest('POST', bulkUrl, formData,
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

    togglePublic(searchParams, publicValue: boolean) {
        const url = this.endPoint + 'toggle_public/';

        const data = {
            search_params: searchParams,
            public: publicValue
        };
        return this.http.post(url, data);
    }
}
