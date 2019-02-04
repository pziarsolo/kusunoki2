import { Injectable } from '@angular/core';
import { ApiUrls } from './apiUrls';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Task } from '../entities/task.model';
import { Observable } from 'rxjs';
import { paramsToHttpParams } from './utils';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    endPoint = ApiUrls.tasks;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(task_id): string {
        return `${this.endPoint}${task_id}/`;
    }
    retrieve(taskId: string, searchParams?): Observable<Task> {
        const getParams = paramsToHttpParams(searchParams);
        const detailUrl = this.composeDetailUrl(taskId);
        return this.http.get<Task>(detailUrl, {params: getParams});
    }

    list(searchParams?): Observable<HttpResponse<Task[]>> {
        const getParams = paramsToHttpParams(searchParams);
        return this.http.get<Task[]>(this.endPoint,
            {params: getParams, observe: 'response'});
    }
}
