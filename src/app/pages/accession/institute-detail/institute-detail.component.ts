import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {of as observableOf,  Observable} from 'rxjs';

import { Institute } from 'src/app/shared/entities/institute.model';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { Country } from 'src/app/shared/entities/country.model';


@Component({
  selector: 'kusunoki2-institute-detail',
  templateUrl: './institute-detail.component.html',
  styleUrls: ['./institute-detail.component.scss']
})
export class InstituteDetailComponent implements OnInit {
    instituteCode: string;
    institute: Observable<Institute>;
    countryColumnsToDisplay = ['code', 'name', 'num_accessions', 'num_accessionsets'];
    country_stats: Observable<Country[]>;
    taxon_stats: Observable<any>;

    pdci_char_config = {headers: [['', 'Num. Passports']],
                        title: 'Pdci Distribution',
                        ticks: [0, 1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10],
                        htitle: 'pdci',
                        vtitle: 'Num passports'};

    constructor(private route: ActivatedRoute,
                private instituteService: InstituteService) {
        this.route.params.subscribe(params => {
            this.instituteCode = params.instituteCode;
        });
    }

    ngOnInit() {
        this.institute = this.instituteService.retrieve(this.instituteCode);
        this.institute.subscribe(
            (response: Institute) => {
                // kusunoki-country-table only accepts observables as inputs
                this.country_stats = observableOf(response.stats_by_country);
                this.taxon_stats = observableOf(response.stats_by_taxon);
            }
        );
    }
}
