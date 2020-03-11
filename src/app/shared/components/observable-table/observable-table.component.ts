import { Component, Input, ViewChild, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'kusunoki2-observable-table',
  templateUrl: './observable-table.component.html',
  styleUrls: ['./observable-table.component.scss']
})
export class ObservableTableComponent implements OnChanges, AfterViewInit {
    @Input() columnsToDisplay: String[];
    @Input() items: Observable<any[]>;
    @Input() initialQueryParams?: any;

    dataTable = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private router: Router) {}


    ngAfterViewInit() {
        this.dataTable.paginator = this.paginator;
    }

    navigateTo(baseUrl, queryParams) {
        queryParams = {...this.initialQueryParams, ...queryParams};
        this.router.navigate([baseUrl], {queryParams: queryParams});

    }
    buildQueryParams(params) {
        if (this.initialQueryParams) {

        }
        return params;

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['items'] && changes['items']['currentValue'] && this.items) {
            this.items.subscribe(data =>  {
                this.dataTable = new MatTableDataSource(data);
                this.dataTable.data = data;
                this.dataTable.sort = this.sort;
                this.dataTable.paginator = this.paginator;
            });
        }
    }
}
