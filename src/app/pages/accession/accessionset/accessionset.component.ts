import { Component, OnInit, Input, ViewEncapsulation, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { Accession } from 'src/app/shared/entities/accession.model';
import { AccessionSet } from 'src/app/shared/entities/accessionset.model';
import { AccessionSetService } from 'src/app/shared/services/accessionset.service';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'kusunoki2-accessionset',
  templateUrl: './accessionset.component.html',
})
export class AccessionSetComponent implements OnChanges {
    accessions: Accession[];

    @Input() accessionset: AccessionSet;
    @Input() editMode: Boolean = false;

    selectedTabIndex = 0;
    constructor(private accessionsetService: AccessionSetService,
                private accessionService: AccessionService) { }

    ngOnChanges(changes: SimpleChanges): void {

        if ('accessionset' in changes && this.accessionset !== undefined) {
            const calls = [];
            this.accessionset.data.accessions.map(item => {
                calls.push(this.accessionService.retrieve(item.instituteCode, item.germplasmNumber));
            });
            forkJoin(...calls)
                .subscribe((responses: Accession[]) => this.accessions = responses);
        }

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
