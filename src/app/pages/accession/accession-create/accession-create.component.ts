import { Component, OnInit } from '@angular/core';
import { Accession } from 'src/app/shared/entities/accession.model';

@Component({
  selector: 'kusunoki2-accession-create',
  templateUrl: 'accession-create.component.html'

})
export class AccessionCreateComponent implements OnInit {
    accession: Accession;
    editMode: Boolean;
    createMode: Boolean;
    constructor() {}

    ngOnInit() {
        this.accession = new Accession;
        this.editMode = true;
        this.createMode = true;
    }
}
