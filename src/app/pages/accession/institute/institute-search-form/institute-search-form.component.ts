import { Component, OnInit, EventEmitter, Output, AfterViewInit, ViewChild } from '@angular/core';
import { InstituteSearchParams } from 'src/app/shared/entities/search-params.model';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map } from 'rxjs/operators';
import { Institute } from 'src/app/shared/entities/institute.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'kusunoki2-institute-search-form',
  templateUrl: './institute-search-form.component.html',
  styleUrls: ['./institute-search-form.component.scss']
})
export class InstituteSearchFormComponent implements AfterViewInit {
    @Output() searchSubmitted = new EventEmitter<InstituteSearchParams>();
    searchParams: InstituteSearchParams = {};
    suggestedInstitutes: Observable<Institute[]>;
    @ViewChild('instituteInput', { read: MatAutocompleteTrigger }) instituteTrigger: MatAutocompleteTrigger;

    constructor(private instituteService: InstituteService) { }

    filterInstitute(val) {
        return this.instituteService.list({
            name__icontains: val,
            fields: 'instituteCode,name'
        })
            .pipe(map(response => response.body));
    }
    doSubmit() {
        this.searchSubmitted.emit(this.searchParams);
        this.resetForm();
    }
    resetForm() {
        this.searchParams = {};
    }
    ngAfterViewInit() {
        this.instituteTrigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    delete this.searchParams.code;
                    this.instituteTrigger.closePanel();
                }
            });
    }
}
