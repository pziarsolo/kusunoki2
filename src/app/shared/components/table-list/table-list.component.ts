import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionViewer } from '@angular/cdk/collections';
import { HttpResponse } from '@angular/common/http';

import { Subscription, throwError, BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { JWTUser } from '../../entities/jwtToken.model';
import { AppUrls } from 'src/app/pages/appUrls';
import { CurrentUserService } from '../../services/current-user.service';
import { ServiceLocatorService } from '../../services/service-locator.service';
import { StatusService } from '../../StatusModule/status.service';
import { InstituteService } from '../../services/institute.service';
import { CountryService } from '../../services/country.service';
import { AccessionService } from '../../services/accession.service';
import { AccessionSetService } from '../../services/accessionset.service';


export abstract class SearchDataSource<T> implements DataSource<T> {
    // private itemsSubject = new BehaviorSubject<T[]>([]);
    private itemsSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    totalCount: number;

    constructor(private searchService,
                private router: Router,
                private retrieveFields: string[],
                private extraSearchParams?) {
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.itemsSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.itemsSubject.complete();
        this.loadingSubject.complete();
    }
    get data(): T[] {
        return this.itemsSubject.value;
    }

    loadItems(search_params)  {
        this.loadingSubject.next(true);
        search_params['fields'] = this.retrieveFields.join(',');

        if (this.extraSearchParams) {
            search_params = Object.assign(search_params, this.extraSearchParams);
        }
        this.searchService.list(search_params)
            .pipe(
                catchError(() => of(new HttpResponse<T[]>())),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(
                response => {
                    this.totalCount = Number(response.headers.get('X-Total-Count'));
                    if (this.totalCount === 1) {
                        const item = response.body[0];
                        this.router.navigate(this.getItemUrl(item));
                    } else {
                        this.itemsSubject.next(response.body);                    }
                },
                error => {
                    console.log('error');
                });
    }
    getItemUrl(item) {
        return [];
    }
}

@Component({
    selector: 'kusunoki2-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, AfterViewInit, OnDestroy {
    service;
    entityClass;
    entityType: string;
    coords: any[];
    dataSource;
    columnsToDisplay: String[];
    paginatorPageSize = 25;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    hasSearchService: Boolean; true;

    userToken: Observable<JWTUser>;
    searchDone: Boolean = false;
    appUrls = AppUrls;
    params; // : AccessionSearchParams | AccessionSetSearchParams;
    pageSubscription: Subscription;
    operationInProgress: Boolean = false;

    constructor(protected router: Router, protected route: ActivatedRoute,
                protected currentUserService: CurrentUserService,
                protected serviceLocator: ServiceLocatorService,
                protected statusService: StatusService) {
    }

    createDatasource() {
        throwError('not implemented: create datastore here');
    }

    ngOnInit() {
        if (this.entityType === 'accession') {
            this.service = this.serviceLocator.injector.get(AccessionService);
        } else if (this.entityType === 'accessionset') {
            this.service = this.serviceLocator.injector.get(AccessionSetService);
        } else if (this.entityType === 'institute') {
            this.service = this.serviceLocator.injector.get(InstituteService);
        } else if (this.entityType === 'country') {
            this.service = this.serviceLocator.injector.get(CountryService);
        }
        this.createDatasource();

        this.route.queryParams.subscribe(params => {
            if (Object.keys(params).length) {
                this.makeQuery(params);
            } else {
                this.searchDone = false;
                this.params = {};
            }
        });
        if (this.entityType === 'accessionset') {
            // this.loadMap();
        }
        this.userToken = this.currentUserService.userToken;

        // if the componenthas no search form and is used just as a list
        // we have to make the first query to api
        if (this.hasSearchService === false) {
            this.makeQuery({});
        }
    }

    makeQuery(params) {
        this.params = Object.assign({}, params);
        this.searchDone = true;
        this.updatePaginatorState(this.params);
        this.dataSource.loadItems(this.params);
    }

    ngAfterViewInit() {
        this.pageSubscription = this.paginator.page
            .pipe(
                tap(() => {
                    const offset = this.paginator.pageIndex * this.paginator.pageSize;
                    this.params['offset'] = offset;
                    this.params['limit'] = this.paginator.pageSize;
                    this.dataSource.loadItems(this.params);
                    const url = this.composeUrlWithParams();
                    this.router.navigateByUrl(url.slice(0, -1));
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.pageSubscription.unsubscribe();
    }

    reciveParams(search_params) {
        this.makeQuery(search_params);
        const url = this.composeUrlWithParams();
        this.router.navigateByUrl(url.slice(0, -1));
        // this.location.go(this.router.url.split('?')[0], search_params);
    }

    composeUrlWithParams() {
        let url = this.router.url.split('?')[0] + '?';
        for (const key of Object.keys(this.params)) {
            url = url + key + '=' + this.params[key] + '&';
        }
        return url;
    }

    updatePaginatorState(params) {
        if (!('offset' in params) && !('limit' in params)) {
            const offset = this.paginator.pageIndex * this.paginator.pageSize;
            params['offset'] = 0;
            params['limit'] = this.paginatorPageSize;
        }
    }
    downloadCsv() {
        const params = Object.assign({}, this.params);
        params['offset'] = 0;
        params['limit'] = this.dataSource.totalCount;
        delete params['fields'];
        return this.service.downloadCsv(params)
            .subscribe(blob => {
                const downloadUrl = URL.createObjectURL(blob);
                window.open(downloadUrl, '_parent');
            });
    }
    loadMap() {
        this.params['limit'] = 500; // this.dataSource.totalCount;
        this.service.listUnpaginatedCoords(this.params)
            .subscribe(data => this.coords = data);
    }
    makeItemPublic(item, partialUpdate) {
        return this.service.partialUpdate(
            item.dataStore, item.dataSource, item.instituteCode,
            item.germplasmNumber, partialUpdate);
    }

    getId(searchItem) {
        throwError('not implemented: create datastore here');
    }
}