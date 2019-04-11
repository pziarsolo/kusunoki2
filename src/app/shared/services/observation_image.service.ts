import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Task } from '../entities/task.model';
import { ObservationImage } from '../entities/observation_images.model';


@Injectable({
    providedIn: 'root'
})
export class ObservationImageService {
    endPoint = ApiUrls.observation_images;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(observation_image_uid: string): string {
        return `${this.endPoint}${observation_image_uid}/`;
    }

    retrieve(observation_image_uid: string, searchParams?): Observable<ObservationImage> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(observation_image_uid);
        return this.http.get<ObservationImage>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<ObservationImage[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<ObservationImage[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }

    create(observation: ObservationImage): Observable<ObservationImage> {
        return this.http.post<ObservationImage>(this.endPoint, observation);
    }

    update(observation_image_uid: string, observation: ObservationImage): Observable<ObservationImage> {
        const detailUrl = this.composeDetailUrl(observation_image_uid);
        return this.http.put<ObservationImage>(detailUrl, observation);
    }

    delete(observation_image_uid: string): Observable<any> {
        const detailUrl = this.composeDetailUrl(observation_image_uid);
        return this.http.delete(detailUrl);
    }

    bulkCreate(file: File, conf: any): Observable<HttpEvent<Task>> {
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
}
