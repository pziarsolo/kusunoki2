import { Component, EventEmitter, Output, ViewChild, AfterViewInit, OnInit, Input, ViewChildren, ɵConsole, OnDestroy } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessionSearchParams } from 'src/app/shared/entities/search-params.model';
import { Institute } from 'src/app/shared/entities/institute.model';
import { Country } from 'src/app/shared/entities/country.model';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { Taxon } from 'src/app/shared/entities/taxon.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { TaxonService } from 'src/app/shared/services/taxon.service';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { Accession } from 'src/app/shared/entities/accession.model';
import { biological_status } from '../../assets/biologicalStatus';
import { ObservationVariableService } from 'src/app/shared/services/observation_variable.service';
import { ObservationVariable } from 'src/app/shared/entities/onservation_variable.model';
import { ScaleService } from 'src/app/shared/services/scale.service';
import { Scale } from 'src/app/shared/entities/scale.model';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { NgForm } from '@angular/forms';
import { Study } from 'src/app/shared/entities/study.model';
import { StudyService } from 'src/app/shared/services/study.service';


@Component({
    selector: 'kusunoki2-accession-search-form',
    templateUrl: './accession-search-form.component.html',
    // styleUrls: ['./accession-search-form.component.scss']
})
export class AccessionSearchFormComponent implements AfterViewInit {
    @Output() searchSubmitted = new EventEmitter<AccessionSearchParams>();
    searchParams: AccessionSearchParams = {};
    showcharaCriteria = false;
    suggestedAccessions: Observable<Accession[]>;
    suggestedInstitutes: Observable<Institute[]>;
    suggestedCountries: Observable<Country[]>;
    suggestedTaxa: Observable<Taxon[]>;
    suggestedStudies: Observable<Study[]>;
    biologicalStatus = biological_status;
    icon = false;
    @ViewChild('countryAuto', {read: MatAutocompleteTrigger, static: false}) countryTrigger: MatAutocompleteTrigger;
    @ViewChild('instituteAuto', {read: MatAutocompleteTrigger, static: false}) instituteTrigger: MatAutocompleteTrigger;
    @ViewChild('taxaAuto', {read: MatAutocompleteTrigger, static: false}) taxaTrigger: MatAutocompleteTrigger;
    @ViewChild('studyAuto', {read: MatAutocompleteTrigger, static: false}) studyTrigger: MatAutocompleteTrigger;
    @ViewChild('observation_filters', {static: false}) observation_filters: AccessionSearchByObservationsFormComponent;

    constructor(private instituteService: InstituteService,
                private countryService: CountryService,
                private taxaService: TaxonService,
                private accessionService: AccessionService,
                private studyService: StudyService) {
    }
    toogleButton() {
        this.icon = !this.icon;
    }
    filterNumber(val) {
        return this.accessionService.list({number_contains: val,
                                           fields: 'germplasmNumber'})
            .pipe(map(response => response.body));
    }
    filterInstitute(val) {
        return this.instituteService.list({name__icontains: val,
                                           fields: 'instituteCode,name'})
            .pipe(map(response => response.body));
    }
    filterCountry(val) {
        return this.countryService.list({name: val, fields: 'code,name'})
            .pipe(map(response => response.body));
    }
    filterTaxa(name) {
        return this.taxaService.list({name__icontains: name, fields: 'name'})
            .pipe(map(response => response.body));
    }
    filterStudies(name) {
        return this.studyService.list({name_icontains: name, fields: 'name'})
            .pipe(map(response => response.body));
    }
    doSubmit() {
        const observationFilters = this.observation_filters.getFilterExpressions();

        if (observationFilters) {
            for (const filter of observationFilters) {
                this.searchParams = Object.assign(this.searchParams, filter);
            }
        }
        this.searchSubmitted.emit(this.searchParams);
        this.resetForm();
    }
    resetForm() {
        this.searchParams = {};
        this.observation_filters.resetForm();
    }
    ngAfterViewInit() {
        this.countryTrigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    delete this.searchParams.country;
                    this.countryTrigger.closePanel();
                }
            });
        this.instituteTrigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    delete this.searchParams.institute_code;
                    this.instituteTrigger.closePanel();
                }
            });
        this.taxaTrigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    delete this.searchParams.taxon_contains;
                    this.taxaTrigger.closePanel();
                }
            });
        this.studyTrigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    delete this.searchParams.study;
                    this.taxaTrigger.closePanel();
                }
            });
    }
}

const EXPRESSIONS = {'bigger than': 'gt',
                     'smaller than': 'lt'};
@Component({
    selector: 'kusunoki2-accession-search-by-observation-form',
    templateUrl: './kusunoki2-accession-search-by-observation-form.html',
    // styleUrls: ['./accession-search-form.component.scss']
})
export class AccessionSearchByObservationFormComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() filterExpression;
    availablelookUpExpressions: string[];
    availableCategories;
    suggestedVariables: Observable<ObservationVariable[]>;
    formChangesSubscription: Subscription;
    // selectedVariable: ObservationVariable;
    @Output() formChanged = new EventEmitter();
    @ViewChild('variableAuto', {read: MatAutocompleteTrigger, static: false}) variableTrigger: MatAutocompleteTrigger;
    @ViewChild('obsForm', {static: false}) obsForm: NgForm;

    constructor(
        private variableService: ObservationVariableService,
        private scaleService: ScaleService ) {}

    ngOnInit() {

    }

    ngOnDestroy() {
        this.formChangesSubscription.unsubscribe();
    }

    filterVariables(val) {
        return this.variableService.list({name__icontains: val})
            .pipe(map(response => response.body));
    }
    variableSelectedTrigger($event) {
        this.scaleService.retrieve(this.filterExpression.variable.data.scale)
            .subscribe((scale: Scale) => {
                this.filterExpression.variable.data.scale = scale;
                if (scale.data_type === 'Numerical') {
                    this.availablelookUpExpressions = ['bigger than', 'smaller than',
                        'equal to'];
                    this.availableCategories =  undefined;
                } else {
                    this.availablelookUpExpressions = undefined;
                    this.availableCategories = scale.valid_values;
                }
            });

    }

    variableDisplay(object?) {
        if (object !== undefined && object !== null) {
            return object.data.name;
        }
        return '';
    }

    ngAfterViewInit() {
        this.formChangesSubscription = this.obsForm.form.valueChanges.subscribe(x => {
            this.formChanged.emit();
        });
        this.variableTrigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    this.resetForm();
                    this.variableTrigger.closePanel();
                }
            });
    }
    resetForm() {
        this.filterExpression.variable = undefined;
        this.filterExpression.value = undefined;
        this.availableCategories =  undefined;
        this.availablelookUpExpressions = undefined;
    }

    getFilterExpression() {
        let variableName = this.filterExpression.variable.data.name;
        if (this.filterExpression.variable.data.scale.data_type === 'Numerical' && this.filterExpression.lookupExpression !== 'equal to') {
            variableName += '__' + EXPRESSIONS[this.filterExpression.lookupExpression];
        }
        return {[variableName]: this.filterExpression.value};
    }
}


@Component({
    selector: 'kusunoki2-accession-search-by-observations-form',
    templateUrl: './kusunoki2-accession-search-by-observations-form.html',
    // styleUrls: ['./accession-search-form.component.scss']
})
export class AccessionSearchByObservationsFormComponent {
    filters = [];

    allInputAreValid = true;
    inputsValidStatuses = {};

    @ViewChildren(AccessionSearchByObservationFormComponent) observationFilterForms;

    checkFormValid(): void {
        if (!this.observationFilterForms) {
            this.allInputAreValid = false;
            return;
        }
        this.allInputAreValid = this.observationFilterForms
            .map(item => item.obsForm.valid)
            .every(v => v);
    }

    getFilterExpressions() {
        return this.observationFilterForms.map(item => item.getFilterExpression());
    }

    addFilter() {
        this.filters = this.filters.concat(
            {variable: undefined, lookupExpression: undefined, value: undefined});
    }
    deleteFilter(index) {
        this.filters.splice(index, 1);
        this.checkFormValid();
        if (this.filters.length  === 0) {
            this.allInputAreValid = true;
        }
    }
    resetForm() {
        this.filters = [];
        this.allInputAreValid = true;
    }
}

