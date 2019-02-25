import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ObservationTableComponent } from 'src/app/shared/components/observation-table/observation-table.component';
import { Location } from '@angular/common';


@Component({
    selector: 'kusunoki2-observation-list',
    templateUrl: './observation-list.component.html',
    styleUrls: ['./observation-list.component.scss']
})
export class ObservationListComponent implements OnInit, OnDestroy {
    searchParams;
    routerSubscription: Subscription;
    searchDone: boolean;
    @ViewChild(ObservationTableComponent) table: ObservationTableComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location) { }

    ngOnInit(): void {
        this.routerSubscription = this.route.queryParams.subscribe(params => {
            if (Object.keys(params).length) {
                this.searchParams = params;
                this.searchDone = true;
            } else {
                this.searchParams = undefined;
                this.searchDone = false;
            }
        });
    }
    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

    receiveParams(searchParams) {
        this.updatePaginatorState(searchParams)
        const url = this.composeUrlWithParams(searchParams);
        this.searchDone = true;
        this.router.navigateByUrl(url.slice(0, -1));
    }
    composeUrlWithParams(searchParams) {
        let url = this.router.url.split('?')[0] + '?';
        for (const key of Object.keys(searchParams)) {
            url = url + key + '=' + searchParams[key] + '&';
        }
        if (url.slice(-1) === '&') {
            url = url.slice(0, -1);
        }
        return url;
    }
    updatePaginatorState(params) {
        if (!('offset' in params) && !('limit' in params)) {
            const offset = this.table.paginator.pageIndex * this.table.paginator.pageSize;
            params['offset'] = 0;
            params['limit'] = this.table.paginatorPageSize;
        }
    }
    searchParamsChanged(searchParams) {
        if (searchParams) {
            const url = this.composeUrlWithParams(searchParams);
            this.location.go(url);
        }
    }
}
