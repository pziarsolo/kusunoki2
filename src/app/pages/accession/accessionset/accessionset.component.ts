import { Component, OnInit, Input, ViewEncapsulation, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { Accession } from 'src/app/shared/entities/accession.model';
import { AccessionSet } from 'src/app/shared/entities/accessionset.model';
import { AccessionSetService } from 'src/app/shared/services/accessionset.service';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'kusunoki2-accessionset',
  templateUrl: './accessionset.component.html',
})
export class AccessionSetComponent implements OnChanges {
    accessions: Accession[];
    userCanEdit: boolean;
    @Input() accessionset: AccessionSet;
    @Input() editMode: Boolean = false;

    selectedTabIndex = 0;
    constructor(private accessionsetService: AccessionSetService,
                private accessionService: AccessionService,
                private statusService: StatusService,
                private currentUserService: CurrentUserService) { }

    ngOnChanges(changes: SimpleChanges): void {

        if ('accessionset' in changes && this.accessionset !== undefined) {
            this.evalUserPermissions();
            const calls = [];
            this.accessionset.data.accessions.map(item => {
                calls.push(this.accessionService.retrieve(item.instituteCode, item.germplasmNumber));
            });
            forkJoin(...calls)
                .subscribe((responses: Accession[]) => this.accessions = responses);
        }

    }
    evalUserPermissions() {
        if (this.userCanEdit === undefined) {
            const userToken = this.currentUserService.currentUserSubject.value;
            const group = this.accessionset.metadata.group;
            const is_public = this.accessionset.metadata.is_public;
            if (userToken.is_staff) {
                this.userCanEdit = true;
            } else if (userToken.groups && group in userToken.groups &&  !is_public) {
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
