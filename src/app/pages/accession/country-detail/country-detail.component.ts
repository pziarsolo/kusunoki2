import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {of as observableOf,  Observable } from 'rxjs';
import { Country } from 'src/app/shared/entities/country.model';
import { Institute } from 'src/app/shared/entities/institute.model';
import { CountryService } from 'src/app/shared/services/country.service';


@Component({
  selector: 'kusunoki2-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
    private code: string;

    country: Observable<Country>;
    instituteStats: Observable<Institute[]>;
    taxonStats: Observable<any>;

    constructor(private route: ActivatedRoute,
                private countryService: CountryService) {
        this.route.params.subscribe(params => {
            this.code = params.code;
        });
    }
    ngOnInit() {
        this.country = this.countryService.retrieve(this.code,
            {fields: 'code,name'});
        this.countryService.retrieve(this.code, {'fields': 'stats_by_institute'})
            .subscribe(
                (response: Country) => {
                    this.instituteStats = observableOf(response.stats_by_institute);
                }
            );
        this.countryService.retrieve(this.code, {'fields': 'stats_by_taxa'})
            .subscribe(
                (response: Country) => {
                    this.taxonStats = observableOf(response.stats_by_taxa);
            }
        );
    }
}
