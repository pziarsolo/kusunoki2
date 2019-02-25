import { Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { MatPaginator } from '@angular/material';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError, Subscription, of, Observable, BehaviorSubject } from 'rxjs';

import { CurrentUserService } from '../../services/current-user.service';
import { ServiceLocatorService } from '../../services/service-locator.service';
import { StatusService } from '../../StatusModule/status.service';
import { ObservationService } from '../../services/observation.service';
import { StudyService } from '../../services/study.service';
import { AppUrls } from 'src/app/pages/appUrls';

export abstract class SearchDataSourceNoRouter<T> implements DataSource<T> {
    private itemsSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    totalCount: number;

    constructor(private searchService,
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
                    this.itemsSubject.next(response.body);
                },
                error => {
                    console.log('error');
                });
    }
}

@Component({
  selector: 'kusunoki2-table-with-filter',
  templateUrl: './table-with-filter.component.html',
  styleUrls: ['./table-with-filter.component.scss']
})
export class TableWithFilterComponent implements OnInit, AfterViewInit, OnDestroy {
    _searchParams: any;
    @Input() set searchParams(value: any) {
        this._searchParams = value;
        this.doSearch(this._searchParams);
    }
    get searchParams(): any {
        return this._searchParams;
    }
    @Output() searchParamsChanged = new EventEmitter<any>();
    entityType: string;
    service;
    dataSource;
    csvDownloading = false;
    paginatorPageSize = 25;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    pageSubscription: Subscription;
    extraSearchParams;
    appUrls = AppUrls;
    constructor(
        protected currentUserService: CurrentUserService,
        protected serviceLocator: ServiceLocatorService,
        protected statusService: StatusService) {
    }

    ngOnInit() {
        if (this.entityType === 'observation') {
            this.service = this.serviceLocator.injector.get(ObservationService);
        } else if (this.entityType === 'study') {
            this.service = this.serviceLocator.injector.get(StudyService);
        }
        this.createDatasource();
        if (this.searchParams !== undefined) {
            this.doSearch(this.searchParams);
        }
    }

    ngAfterViewInit() {
        this.pageSubscription = this.paginator.page
            .pipe(
                tap(() => {
                    const offset = this.paginator.pageIndex * this.paginator.pageSize;
                    const newPaginatorState = {offset: offset, limit: this.paginator.pageSize};
                    const fakeDict = Object.assign({}, this._searchParams);
                    this.searchParams = Object.assign(fakeDict, newPaginatorState);
                    this.searchParamsChanged.emit(this.searchParams);
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.pageSubscription.unsubscribe();
    }

    doSearch(searchParams) {
        if (this.dataSource) {
            searchParams = Object.assign({}, searchParams);
            this.updatePaginatorState(searchParams);
            this.dataSource.loadItems(searchParams);
            // if (this.searchParams !== undefined) {
            //     this.searchParamsChanged.emit(this.searchParams);
            // }

        }
    }

    updatePaginatorState(searchParams) {
        if (!('offset' in searchParams) && !('limit' in searchParams)) {
            const offset = this.paginator.pageIndex * this.paginator.pageSize;
            searchParams['offset'] = 0;
            searchParams['limit'] = this.paginatorPageSize;
        }
    }

    createDatasource() {
        throwError('not implemented: create datastore here');
    }

    downloadCsv() {
        const params = Object.assign({}, this.searchParams);
        params['offset'] = 0;
        params['limit'] = this.dataSource.totalCount;
        delete params['fields'];
        this.csvDownloading = true;
        return this.service.downloadCsv(params)
            .subscribe(
                blob => {
                    const downloadUrl = URL.createObjectURL(blob);
                    window.open(downloadUrl, '_parent');
                    this.csvDownloading = false;
                },
                error => {
                    this.statusService.error(error);
                    this.csvDownloading = false;
                });
    }
}
