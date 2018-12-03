import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kusunoki2-accession-detail',
  templateUrl: 'accession-detail.component.html'

})
export class AccessionDetailComponent {
    instituteCode: string;
    germplasmNumber: string;
    editMode = false;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.instituteCode = params.instituteCode;
            this.germplasmNumber = params.germplasmNumber;
        });
    }
}
