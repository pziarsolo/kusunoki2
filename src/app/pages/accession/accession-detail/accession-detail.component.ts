import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { Accession } from 'src/app/shared/entities/accession.model';

@Component({
  selector: 'kusunoki2-accession-detail',
  templateUrl: 'accession-detail.component.html'

})
export class AccessionDetailComponent  implements OnInit {
    @Input() instituteCode: string;
    @Input() germplasmNumber: string;
    accession: Accession;
    editMode = false;

    constructor(
        private route: ActivatedRoute,
        private readonly accessionService: AccessionService
    ) {
        this.route.params.subscribe(params => {
            this.instituteCode = params.instituteCode;
            this.germplasmNumber = params.germplasmNumber;
        });
    }
    ngOnInit(): void {
        this.accessionService.retrieve(this.instituteCode, this.germplasmNumber)
            .subscribe((accession: Accession) => {
                this.accession = accession;
            });

    }
}
