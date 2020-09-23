import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'kusunoki2-table-search-page',
  templateUrl: './table-search-page.component.html',
  styleUrls: ['./table-search-page.component.scss']
})
export class TableSearchPageComponent implements OnInit, OnDestroy {
    searchParams;
    routerSubscription: Subscription;
    searchDone: boolean;
    table: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        public currentUserService: CurrentUserService) { }

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
        this.updatePaginatorState(searchParams);
        const url = this.composeUrlWithParams(searchParams);
        this.searchDone = true;
        this.router.navigateByUrl(url);
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
