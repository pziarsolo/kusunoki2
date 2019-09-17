import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Accession } from 'src/app/shared/entities/accession.model';
import { AccessionSet } from 'src/app/shared/entities/accessionset.model';
import { AccessionSetService } from 'src/app/shared/services/accessionset.service';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { forkJoin } from 'rxjs';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppUrls } from 'src/app/pages/appUrls';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';

@Component({
    selector: 'kusunoki2-accessionset',
    templateUrl: './accessionset.component.html',
})
export class AccessionSetComponent implements OnChanges {
    accessions: Accession[];
    userCanEdit: boolean;
    @Input() accessionset: AccessionSet;
    @Input() editMode: Boolean = false;
    appConfig: AppConfig;
    selectedTabIndex = 0;

    constructor(private accessionsetService: AccessionSetService,
        private accessionService: AccessionService,
        private statusService: StatusService,
        private currentUserService: CurrentUserService,
        private readonly router: Router,
        public dialog: MatDialog,
        private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
    }

    loadData() {
        this.evalUserPermissions();
        const calls = [];
        if (this.accessionset.data.accessions !== undefined) {
            this.accessionset.data.accessions.map(item => {
                calls.push(this.accessionService.retrieve(item.instituteCode, item.germplasmNumber));
            });

            forkJoin(calls)
                .subscribe(
                    (responses: Accession[]) => this.accessions = responses,
                    error => {
                        let errorMsg;
                        if (error.status === 404) {
                            errorMsg = 'Accessions not found or you dont have permissions to see them';
                        } else {
                            errorMsg = error.error.detail;
                        }
                        this.statusService.error(errorMsg);
                    });
        }
    }


    ngOnChanges(changes: SimpleChanges): void {
        if ('accessionset' in changes && this.accessionset !== undefined) {
            this.loadData();
        }
    }
    evalUserPermissions() {
        if (this.userCanEdit === undefined) {
            const userToken = this.currentUserService.currentUserSubject.value;
            const group = this.accessionset.metadata.group;
            const is_public = this.accessionset.metadata.is_public;
            if (userToken.is_staff) {
                this.userCanEdit = true;
            } else if (userToken.groups && group in userToken.groups && !is_public) {
                this.userCanEdit = true;
            } else {
                this.userCanEdit = false;
            }
        }
    }
    tooglePublic() {
        this.accessionset.metadata.is_public = !this.accessionset.metadata.is_public;
        this.accessionsetService.update(this.accessionset.data.instituteCode,
            this.accessionset.data.accessionsetNumber,
            this.accessionset.getApiDocument())
            .subscribe(
                (updatedAccessionset: AccessionSet) => {
                    this.accessionset = updatedAccessionset;
                    this.statusService.info('Accessionse sucessfully updated');
                },
                (error) => console.log(error)
            );
    }
    deleteAccessionSet() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {
                type: 'AccessionSet',
                description: `AccessionSet: ${this.accessionset.data.instituteCode}:${this.accessionset.data.accessionsetNumber}`
            }
        });
        dialogRef.afterClosed().subscribe(doDeleteAccessionSet => {
            if (doDeleteAccessionSet) {
                this.accessionsetService.delete(this.accessionset.data.instituteCode,
                    this.accessionset.data.accessionsetNumber)
                    .subscribe(
                        response => {
                            this.statusService.info('AccessionSet sucessfully deleted');
                            this.router.navigate([AppUrls.accessionsets]);
                        },
                        error => this.statusService.error(error.error.detail)
                    );
            }
        });
    }
    // formReset() {
    //     this.edit_mode = false;
    //     this.model = new AccessionSet(Object.assign({}, this.pristine_model));
    // }

    // Submit() {
    //     this.accessionset_service.update(this.pristine_model.accessionset_uid,
    //                                      this.model)
    //         .subscribe(
    //             (data: AccessionSet) => {
    //                 this.model = data;
    //             },
    //             (error) => {
    //                 console.log(error);
    //             }
    //         );
    //     this.edit_mode = false;
    // }
}
