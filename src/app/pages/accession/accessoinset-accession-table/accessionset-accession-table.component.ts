import { Component, Input, EventEmitter, Output, OnInit, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';

import { Accession } from '../../../shared/entities/accession.model';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'kusunoki2-accessionset-accession-table',
    templateUrl: './accessionset-accession-table.component.html',
    styleUrls: ['./accessionset-accession-table.component.scss']
})
export class AccessionSetAccessionTableComponent implements OnInit {
    @Input() accessions;

    @Output() accessionSelected = new EventEmitter<Accession>();
    @Output() accessionAdded = new EventEmitter<Accession>();
    @Output() accessionRemoved = new EventEmitter<Accession>();

    columnsToDisplay = ['instituteCode', 'germplasmNumber', 'conservationStatus',
                        'is_available'];

    dataSource;

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<Accession>(this.accessions);
    }
}
