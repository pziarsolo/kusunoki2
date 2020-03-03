import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { StudySearchParams } from 'src/app/shared/entities/search-params.model';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { Taxon } from 'src/app/shared/entities/accession.model';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { TaxonService } from 'src/app/shared/services/taxon.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kusunoki2-study-search-form',
  templateUrl: './study-search-form.component.html',
  styleUrls: ['./study-search-form.component.scss']
})
export class StudySearchFormComponent implements OnInit, AfterViewInit {
    @Output() searchSubmitted = new EventEmitter<any>();
    searchParams: StudySearchParams = {};
    userToken;
    suggestedTaxa: Observable<Taxon[]>;

    @ViewChild('taxaAuto', { read: MatAutocompleteTrigger, static: false }) taxaTrigger: MatAutocompleteTrigger;

    constructor(
        private currentUserService: CurrentUserService,
        private taxaService: TaxonService) {}

    ngOnInit(): void {
        this.userToken = this.currentUserService.userToken;
    }
    filterTaxa(name) {
        return this.taxaService.list(
            {name__icontains: name, fields: 'name', accession_in_study: true}
        ).pipe(
            map(response => response.body)
        );
    }
    doSubmit() {
        this.searchSubmitted.emit(this.searchParams);
        this.searchParams = {};
    }
    ngAfterViewInit() {
        this.taxaTrigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    delete this.searchParams.taxon_contains;
                    this.taxaTrigger.closePanel();
                }
            });
    }
}
