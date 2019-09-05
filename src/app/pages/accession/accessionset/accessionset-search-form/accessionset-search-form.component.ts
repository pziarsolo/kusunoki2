import { Component, EventEmitter, Output, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessionSetSearchParams } from 'src/app/shared/entities/search-params.model';
import { Institute } from 'src/app/shared/entities/institute.model';
import { Country } from 'src/app/shared/entities/country.model';
import { Taxon } from 'src/app/shared/entities/taxon.model';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { CountryService } from 'src/app/shared/services/country.service';
import { TaxonService } from 'src/app/shared/services/taxon.service';
import { NumbersService } from 'src/app/shared/services/numbers.service';
import { biological_status } from '../../assets/biologicalStatus';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';


@Component({
    selector: 'kusunoki2-accessionset-search-form',
    templateUrl: './accessionset-search-form.component.html',
    styleUrls: ['./accessionset-search-form.component.scss']
  })
  export class AccessionSetSearchFormComponent implements AfterViewInit, OnInit {
        @Output() searchSubmitted = new EventEmitter<AccessionSetSearchParams>();
        searchParams: AccessionSetSearchParams = {};

        suggestedNumbers: Observable<any[]>;
        // suggestedInstitutes: Observable<Institute[]>;
        suggestedCountries: Observable<Country[]>;
        suggestedTaxa: Observable<Taxon[]>;
        biologicalStatus = biological_status;
        userToken;
        @ViewChild('countryAuto', {read: MatAutocompleteTrigger, static: false}) countryTrigger: MatAutocompleteTrigger;
        // @ViewChild('instituteAuto', {read: MatAutocompleteTrigger, static: false}) instituteTrigger: MatAutocompleteTrigger;
        @ViewChild('taxaAuto', {read: MatAutocompleteTrigger, static: false}) taxaTrigger: MatAutocompleteTrigger;

        constructor(private instituteService: InstituteService,
                    private countryService: CountryService,
                    private taxaService: TaxonService,
                    private numberService: NumbersService,
                    private currentUserService: CurrentUserService) {
        }
        ngOnInit(): void {
            this.userToken = this.currentUserService.userToken;
        }
        filterNumber(val) {
            return this.numberService.list({number__icontains: val})
                .pipe(map(response => response));
        }

        filterInstitute(val) {
            return this.instituteService.list({code_or_name: val, fields: 'instituteCode,name'})
                .pipe(map(response => response));
        }
        filterCountry(val) {
            return this.countryService.list({code_or_name: val, fields: 'code,name'})
                .pipe(map(response => response.body));
        }
        filterTaxa(name) {
            return this.taxaService.list({name__icontains: name, fields: 'name'})
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
