import { Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { Accession } from 'src/app/shared/entities/accession.model';
import { Subscription } from 'rxjs';
import { AccessionComponent } from '../accession/accession.component';
import { Title } from '@angular/platform-browser';

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
    @ViewChild('accessionComp', {static: false}) accessionComp: AccessionComponent;
    constructor(
        private route: ActivatedRoute,
        private readonly accessionService: AccessionService,
        private titleService: Title
    ) {}

    ngOnInit(): void {

        this.routerSubscription = this.route.params.subscribe(params => {
            this.instituteCode = params.instituteCode;
            this.germplasmNumber = params.germplasmNumber;
            this.titleService.setTitle('Accession ' + this.instituteCode + ':' + this.germplasmNumber);
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
