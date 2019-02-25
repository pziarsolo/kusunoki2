import { Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { Accession } from 'src/app/shared/entities/accession.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kusunoki2-accession-detail',
  templateUrl: 'accession-detail.component.html'

})
export class AccessionDetailComponent  implements OnInit, OnDestroy {
    instituteCode: string;
    germplasmNumber: string;
    accession: Accession;
    editMode = false;
    routerSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private readonly accessionService: AccessionService
    ) {}

    ngOnInit(): void {
        this.routerSubscription = this.route.params.subscribe(params => {
            this.instituteCode = params.instituteCode;
            this.germplasmNumber = params.germplasmNumber;
            this.accessionService.retrieve(this.instituteCode, this.germplasmNumber)
                .subscribe((accession: Accession) => {
                    this.accession = accession;
                });
        });
    }
    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}
