import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {of as observableOf,  Observable } from 'rxjs';
import { Country } from 'src/app/shared/entities/country.model';
import { Institute } from 'src/app/shared/entities/institute.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { Title } from '@angular/platform-browser';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'kusunoki2-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
    private code: string;
    appConfig: AppConfig;
    country: Observable<Country>;
    instituteStats: Observable<Institute[]>;
    taxonStats: Observable<any>;
    instituteFields = ['code', 'name', 'num_accessions', 'num_accessionsets'];
    constructor(private route: ActivatedRoute,
                private countryService: CountryService,
                private titleService: Title,
                private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
        this.route.params.subscribe(params => {
            this.code = params.code;
        });
    }
    ngOnInit() {
        if (!this.appConfig.useAccessionset) {
            this.instituteFields = ['code', 'name', 'num_accessions'];
        }
        this.titleService.setTitle('Country ' + this.code);
        this.country = this.countryService.retrieve(this.code,
            {fields: 'code,name'});
        this.instituteStats = this.countryService.retrieve(this.code, {'fields': 'stats_by_institute'})
            .pipe(
                map((response: Country) => response.stats_by_institute)
            );
        this.taxonStats = this.countryService.retrieve(this.code, {'fields': 'stats_by_taxa'})
            .pipe(
                map((item: Country) => item.stats_by_taxa)
            );
    }
}
