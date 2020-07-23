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

@Component({
  selector: 'kusunoki2-observation-search-form',
  templateUrl: './observation-search-form.component.html',
  styleUrls: ['./observation-search-form.component.scss']
})
export class ObservationSearchFormComponent implements AfterViewInit{
    @Output() searchSubmitted = new EventEmitter<any>();
    searchParams: ObservationSearchParams =  {};
    suggestedTaxa: Observable<Taxon[]>;
    @ViewChild('studiesForm') studiesForm: StudyMultiAutocompleteComponent;
    @ViewChild('observationVariableForm') observationVariableForm: ObservationVariableMultiAutocompleteComponent;
    @ViewChild('taxaInput', { read: MatAutocompleteTrigger }) taxaTrigger: MatAutocompleteTrigger;
    constructor(private taxaService: TaxonService) {}

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
