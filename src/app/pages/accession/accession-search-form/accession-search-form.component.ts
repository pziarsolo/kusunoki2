import { Component, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessionSearchParams } from 'src/app/shared/entities/search-params.model';
import { Institute } from 'src/app/shared/entities/institute.model';
import { Country } from 'src/app/shared/entities/country.model';
import { biological_status } from '../assets/biologicalStatus';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { Taxon } from 'src/app/shared/entities/taxon.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { TaxonService } from 'src/app/shared/services/taxon.service';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { Accession } from 'src/app/shared/entities/accession.model';


@Component({
    selector: 'kusunoki2-accession-search-form',
    templateUrl: './accession-search-form.component.html',
    // styleUrls: ['./accession-search-form.component.scss']
  })
  export class AccessionSearchFormComponent implements AfterViewInit {
        @Output() searchSubmitted = new EventEmitter<AccessionSearchParams>();
        searchParams: AccessionSearchParams = {};

        suggestedAccessions: Observable<Accession[]>;
        suggestedInstitutes: Observable<Institute[]>;
        suggestedCountries: Observable<Country[]>;
        suggestedTaxa: Observable<Taxon[]>;
        biologicalStatus = biological_status;

        @ViewChild('countryAuto', {read: MatAutocompleteTrigger}) countryTrigger: MatAutocompleteTrigger;
        @ViewChild('instituteAuto', {read: MatAutocompleteTrigger}) instituteTrigger: MatAutocompleteTrigger;
        @ViewChild('taxaAuto', {read: MatAutocompleteTrigger}) taxaTrigger: MatAutocompleteTrigger;

        constructor(private instituteService: InstituteService,
                    private countryService: CountryService,
                    private taxaService: TaxonService,
                    private accessionService: AccessionService) {
        }

        filterNumber(val) {
            return this.accessionService.list({numbers: val,
                                               fields: 'germplasmNumber'})
                .pipe(map(response => response.body));
        }
        filterInstitute(val) {
            return this.instituteService.list({name__icontains: val,
                                               fields: 'instituteCode,name'})
                .pipe(map(response => response.body));
        }
        filterCountry(val) {
            return this.countryService.list({name: val,
                                             fields: 'code,name'})
                .pipe(map(response => response.body));
        }
        filterTaxa(name) {
            return this.taxaService.list({name__icontains: name,
                                          fields: 'name'})
                .pipe(map(response => response.body));
        }


        doSubmit() {
            this.searchSubmitted.emit(this.searchParams);
            this.searchParams = {};
        }
        ngAfterViewInit() {
            this.countryTrigger.panelClosingActions
                .subscribe(e => {
                    if (!(e && e.source)) {
                        delete this.searchParams.country;
                        this.countryTrigger.closePanel();
                    }
                });
            this.taxaTrigger.panelClosingActions
                .subscribe(e => {
                    if (!(e && e.source)) {
                        delete this.searchParams.taxon_contains;
                        this.taxaTrigger.closePanel();
                    }
                });

        }
    }

