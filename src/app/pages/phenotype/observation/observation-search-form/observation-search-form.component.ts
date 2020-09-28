import { Component, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { ObservationSearchParams } from 'src/app/shared/entities/search-params.model';
import { StudyMultiAutocompleteComponent } from '../../study/study-multi-autocomplete/study-multi-autocomplete.component';
import { ObservationVariableMultiAutocompleteComponent
    } from '../../observation_variable/observation_variable-multi-autocomplete/observation-variable-multi-autocomplete.component';
import { TaxonService } from 'src/app/shared/services/taxon.service';
import { Observable } from 'rxjs';
import { Taxon } from 'src/app/shared/entities/taxon.model';
import { map } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Accession } from 'src/app/shared/entities/accession.model';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';

@Component({
  selector: 'kusunoki2-observation-search-form',
  templateUrl: './observation-search-form.component.html',
  styleUrls: ['./observation-search-form.component.scss']
})
export class ObservationSearchFormComponent implements AfterViewInit{
    @Output() searchSubmitted = new EventEmitter<any>();
    searchParams: ObservationSearchParams =  {};
    suggestedTaxa: Observable<Taxon[]>;
    suggestedAccessions: Observable<Accession[]>;
    appConfig: AppConfig;
    @ViewChild('studiesForm') studiesForm: StudyMultiAutocompleteComponent;
    @ViewChild('observationVariableForm') observationVariableForm: ObservationVariableMultiAutocompleteComponent;
    @ViewChild('taxaInput', { read: MatAutocompleteTrigger }) taxaTrigger: MatAutocompleteTrigger;
    constructor(private taxaService: TaxonService,
        private accessionService: AccessionService,
        private appConfigService: AppConfigService) {
            this.appConfig = this.appConfigService.getConfig()
        }

    doSubmit() {
        const studies = this.studiesForm.items;
        if (studies.length ===  1) {
            this.searchParams['study'] = studies[0];
        } else if (studies.length > 1) {
            this.searchParams['studies'] = studies;
        }
        const obs_variables = this.observationVariableForm.items;
        if (obs_variables.length ===  1) {
            this.searchParams['observation_variable'] = obs_variables[0];
        } else if (obs_variables.length > 1) {
            this.searchParams['observation_variables'] = obs_variables;
        }
        this.searchSubmitted.emit(this.searchParams);
        this.searchParams = {};
    }

    formReset() {
        this.searchParams = {};
        this.studiesForm.formReset();
    }
    filterTaxa(name) {
        return this.taxaService.list({ name__icontains: name, fields: 'name', ordering: 'name'  })
            .pipe(map(response => response.body));
    }

    filterNumber(val) {
        return this.accessionService.list({
            number_contains: val,
            fields: 'germplasmNumber'
        })
            .pipe(map(response => response.body));
    }
    ngAfterViewInit() {
        this.taxaTrigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    delete this.searchParams.taxon;
                    this.taxaTrigger.closePanel();
                }
            });
    }
}
