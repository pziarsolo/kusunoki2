import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableWithFilterComponent, SearchDataSourceNoRouter
} from 'src/app/shared/components/table-with-filter/table-with-filter.component';
import { Observation } from 'src/app/shared/entities/observation.model';
import { AppUrls } from 'src/app/pages/appUrls';
import { SelectionModel } from '@angular/cdk/collections';
import { forkJoin } from 'rxjs'
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ServiceLocatorService } from 'src/app/shared/services/service-locator.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

class ObservationDataSource extends SearchDataSourceNoRouter<Observation> {
    mappingFields = {
        study: 'observation_unit__study__name',
        observation_unit: 'observation_unit__name',
        accession: 'observation_unit__accession__germplasm_number',
        value_beauty: 'value',
        observation_variable: 'observation_variable__name'
    };
}


@Component({
  selector: 'kusunoki2-observation-table',
  templateUrl: './observation-table.component.html',
  styleUrls: ['./observation-table.component.scss']
})
export class ObservationTableComponent extends TableWithFilterComponent implements OnChanges {
    entityType = 'observation';
    defColumnsToDisplay = ['study', 'observation_unit',
                           'accession', 'observation_variable', 'value_beauty'];
                        //    'observation_id', 'creation_time'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    extraSearchParams = {};
    appUrls = AppUrls;
    selection = new SelectionModel<Observation>(true, []);

    private _editMode;

    get editMode(): boolean {
        return this._editMode;
    }

    @Input()
    set editMode(val: boolean) {
        this._editMode = val;
        if (this.columnsToDisplay !== undefined && this.columnsToDisplay !== null) {
            if (this._editMode && !('select' in this.columnsToDisplay)) {
                this.columnsToDisplay = this.columnsToDisplay.concat(['select']);
            } else if (!this._editMode) {
                const index = this.columnsToDisplay.indexOf('select', 0);
                if (index > -1) {
                    this.columnsToDisplay.splice(index, 1);
                }
                this.selection.clear();
            }
        }
    }

    constructor(
        public currentUserService: CurrentUserService,
        protected serviceLocator: ServiceLocatorService,
        protected statusService: StatusService,
        protected router: Router,
        protected appConfigService: AppConfigService,
        public dialog: MatDialog) {
        super(currentUserService, serviceLocator,
            statusService, router, appConfigService);
    }

    createDatasource() {

        this.dataSource = new ObservationDataSource(
            this.service, this.columnsToDisplay.concat(['observation_id']), this.extraSearchParams);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Observation): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.observation_id + 1}`;
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if ('editMode ' in changes) {
            console.log('hhh');
        }
    }
    deleteSelected() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {
                type: 'Observation',
                description: `Are you sure you want to delete ${this.selection.selected.length} observations`
            }
        });
        dialogRef.afterClosed().subscribe(doDeleteAccession => {
            if (doDeleteAccession) {
                const tasks = [];
                for (const observation of this.selection.selected) {
                    tasks.push(this.service.delete(observation.observation_id));
                }
                forkJoin(...tasks)
                    .subscribe(
                        () => {
                            this.doSearch(this._searchParams);
                            this.selection.clear();
                            this.statusService.info('Observations succesfully deleted');
                        },
                        (errors) => {
                            console.log(errors);
                            this.doSearch(this._searchParams);
                            this.selection.clear();
                            this.statusService.error('There was one or more errors deleting observations');
                        }
                    );
            }
        });
    }
}


