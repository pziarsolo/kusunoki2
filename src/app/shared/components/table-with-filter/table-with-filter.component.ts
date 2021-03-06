import { Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { MatPaginator } from '@angular/material/paginator';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

import { tap, catchError, finalize, concatMap } from 'rxjs/operators';
import { throwError, Subscription, of, Observable, BehaviorSubject, concat } from 'rxjs';

import { CurrentUserService } from '../../services/current-user.service';
import { ServiceLocatorService } from '../../services/service-locator.service';
import { StatusService } from '../../StatusModule/status.service';
import { ObservationService } from '../../services/observation.service';
import { StudyService } from '../../services/study.service';
import { AppUrls } from 'src/app/pages/appUrls';
import { AccessionService } from '../../services/accession.service';
import { AccessionSetService } from '../../services/accessionset.service';
import { CountryService } from '../../services/country.service';
import { InstituteService } from '../../services/institute.service';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ObservationVariableService } from '../../services/observation_variable.service';
import { AppConfigService } from '../../services/app-config.service';
import { AppConfig } from '../../entities/app-config.model';
import { SeedRequestService } from '../../../pages/seed-requests/services/seed-request.service';

export abstract class SearchDataSourceNoRouter<T> implements DataSource<T> {
    private itemsSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    totalCount: number;
    lastSeachParams;
    mappingFields = {};

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
        this.lastSeachParams = undefined;
    }
    get data(): T[] {
        return this.itemsSubject.value;
    }

    loadItems(search_params, ordering?)  {
        this.loadingSubject.next(true);
        search_params['fields'] = this.retrieveFields.join(',');

        if (this.extraSearchParams) {
            search_params = Object.assign(search_params, this.extraSearchParams);
        }
        if (!ordering) {
            this.lastSeachParams = search_params;
        } else {
            search_params = Object.assign(search_params, ordering);
        }
        return this.searchService.list(search_params)
            .pipe(
                catchError(() => of(new HttpResponse<T[]>())),
                finalize(() => this.loadingSubject.next(false))
            );
            // .subscribe(
            //     response => {
            //         this.totalCount = Number(response.headers.get('X-Total-Count'));
            //         this.itemsSubject.next(response.body);
            //     },
            //     error => {
            //         console.log('error');
            //     });
    }
    sortData(event) {
        const direction = event.direction === 'asc' ? '-' : '+';
        let tableField;
        if (Object.keys(this.mappingFields).indexOf(event.active) > -1) {
            tableField = this.mappingFields[event.active];
        } else {
            tableField = event.active;
        }
        const ordering = {'ordering': `${direction}${tableField}`};
        this.loadItems(this.lastSeachParams, ordering);
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
    defColumnsToDisplay: string[];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    @Output() searchParamsChanged = new EventEmitter<any>();
    @Output() searchFinished = new EventEmitter<number>();
    entityType: string;
    service;
    dataSource;
    csvDownloading = false;
    paginatorPageSize = 25;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    pageSubscription: Subscription;
    extraSearchParams;
    appUrls = AppUrls;
    userToken;
    appConfig: AppConfig;

    constructor(
        protected currentUserService: CurrentUserService,
        protected serviceLocator: ServiceLocatorService,
        protected statusService: StatusService,
        protected router: Router,
        protected appConfigService: AppConfigService) {
            this.appConfig = this.appConfigService.getConfig();
    }

    configureTable() {}

    ngOnInit() {
        this.configureTable();
        if (this.entityType === 'observation') {
            this.service = this.serviceLocator.injector.get(ObservationService);
        } else if (this.entityType === 'study') {
            this.service = this.serviceLocator.injector.get(StudyService);
        } else if (this.entityType === 'accession') {
            this.service = this.serviceLocator.injector.get(AccessionService);
        } else if (this.entityType === 'accessionset') {
            this.service = this.serviceLocator.injector.get(AccessionSetService);
        } else if (this.entityType === 'country') {
            this.service = this.serviceLocator.injector.get(CountryService);
        } else if (this.entityType === 'institute') {
            this.service = this.serviceLocator.injector.get(InstituteService);
        } else if (this.entityType === 'task') {
            this.service = this.serviceLocator.injector.get(TaskService);
        } else if (this.entityType === 'seed_request') {
            this.service = this.serviceLocator.injector.get(SeedRequestService);
        } else if (this.entityType === 'observation_variable') {
            this.service = this.serviceLocator.injector.get(ObservationVariableService);

        }
        this.createDatasource();
        if (this.searchParams !== undefined) {
            this.doSearch(this.searchParams);
        }
        this.userToken = this.currentUserService.userToken;
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
            this.dataSource.loadItems(searchParams)
                .subscribe(
                    response => {
                        this.dataSource.totalCount = Number(response.headers.get('X-Total-Count'));
                        this.dataSource.itemsSubject.next(response.body);
                        this.searchFinished.emit(this.dataSource.totalCount);
                    },
                    error => {
                        console.log('error');
                    });
        }
    }

    updatePaginatorState(searchParams) {
        if (!('offset' in searchParams) && !('limit' in searchParams) &&
            this.paginator !== undefined) {

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
        delete params['fields'];

        const total = this.dataSource.totalCount;
        const step = this.appConfig.csvChunkSize;


        const responses: Observable<Blob>[] = [];
        let first = true;
        let csvHeader;
        for (const offset of _Array.range(0, total, step)) {
            params['offset'] = offset;
            params['limit'] = step;
            if (first) {
                csvHeader = true;
                first = false;
            } else {
                csvHeader = false;
            }
            this.csvDownloading = true;
            const response = this.service.downloadCsv(params, csvHeader);
            responses.push(response);
        }
        const blobs = [];
        concat(responses)
            .pipe(
                concatMap(r => r),
                finalize(() => {
                    const mergedBlob = blobs.reduce((_b_, b) => new Blob([_b_, b], { type: 'text/csv;charset=utf-8;' }));
                    const downloadUrl = URL.createObjectURL(mergedBlob);
                    window.open(downloadUrl, '_parent');
                    this.csvDownloading = false;
                })
            )
            .subscribe((response: Blob) => {
                blobs.push(response);

            });

    }
    navigateTo(baseUrl, queryParams) {
        queryParams = {...this.searchParams, ...queryParams};
        this.router.navigate([baseUrl], {queryParams: queryParams});

    }

    togglePublic(publicValue) {
        this.service.togglePublic(this.dataSource.lastSeachParams, publicValue)
            .subscribe(result => {
                this.statusService.info(result.detail);
            });
    }
}

interface _Iterable extends Iterable<{}> {
    length: number;
}

class _Array<T> extends Array<T> {
    static range(from: number, to: number, step: number): number[] {
        return Array.from(
            (<_Iterable>{ length: Math.floor((to - from) / step) + 1 }),
            (v, k) => from + k * step
        );
    }
}
