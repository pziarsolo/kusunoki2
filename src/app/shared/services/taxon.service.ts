import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiUrls } from './apiUrls';
import { paramsToHttpParams } from './utils';
import { Taxon } from '../entities/taxon.model';


@Injectable({
    providedIn: 'root'
})
export class TaxonService {
    endPoint = ApiUrls.taxa;

    constructor(private http: HttpClient) {}

    private composeDetailUrl(rank: string, name: string): string {
        return `${this.endPoint}${rank}/${name}/`;
    }

    retrieve(rank: string, name: string): Observable<Taxon> {
        const detailUrl = this.composeDetailUrl(rank, name);
        return this.http.get<Taxon>(detailUrl);
    }

    list(searchParams?): Observable<HttpResponse<Taxon[]>> {
        const get_params = paramsToHttpParams(searchParams);
        return this.http.get<Taxon[]>(this.endPoint,
            { params: get_params, observe: 'response'});
    }
    statsByRank() {
        const statsUrl  = this.endPoint + 'stats_by_rank/';
        return this.http.get<any>(statsUrl);
    }
}
