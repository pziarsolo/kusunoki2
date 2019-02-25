import { Component, SimpleChanges, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { MatAutocompleteTrigger } from '@angular/material';

import { Subscription , Observable, of} from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { Institute } from 'src/app/shared/entities/institute.model';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';


@Component({
  selector: 'kusunoki2-inline-auto-institute',
  templateUrl: './inline-auto-institute.component.html',
  styleUrls: ['./inline-auto-institute.component.scss']
})
export class InlineAutoInstituteComponent extends InlineEditComponent implements OnChanges, AfterViewInit {
    suggestions: Observable<Institute[]>;
    subscription: Subscription;

    @ViewChild(MatAutocompleteTrigger) trigger;

    constructor(public service: InstituteService) {
        super();
    }

    afterOnInit() {
        this.suggestions = this.inputControl.valueChanges
            .pipe(
                startWith(null),
                filter(val => val !== null),
                debounceTime(200),
                distinctUntilChanged(),
                switchMap(val => {
                    return this.filter(val);
                })
            );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.value === undefined || this.value === null) {
            this.initialValue = {'instituteCode': null,
                                  'name': null};
        } else if (typeof this.value === 'string') {
            this.subscription = this.service.retrieve(this.value,
                                                      {'fields': 'instituteCode,name'})
                .subscribe(
                    (response) => {
                        this.initialValue = response;
                        this.inputControl.patchValue(this.initialValue);
                    }
                );
        } else {
            this.initialValue = this.value;
        }
    }

    ngAfterViewInit() {
        this.trigger.panelClosingActions
            .subscribe(e => {
                if (!(e && e.source)) {
                    this.inputControl.setValue(null);
                    this.trigger.closePanel();
                }
            });
    }

    afterOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    filter(inputVal) {
        if (typeof(inputVal) === 'string') {
            return this.service.list({code_or_name: inputVal,
                                    fields: 'instituteCode,name'})
                .pipe(map(response => response.body));
        }
        return of([]);
    }

    setConfigDefaultValues() {
        if (this.config.is_editable === undefined) {
            this.config.is_editable = true;
        }
        if (this.config.type === undefined) {
            this.config.type = String;
        }
        if (this.config.validators === undefined) {
            this.config.validators = [];
        }
    }

    display(entity) {
        if (entity === undefined || entity === null) {
            return '';
        }
        if (entity.instituteCode === undefined) {
            return entity;
        }
        return `${entity.name} (${entity.instituteCode})`;
    }

    getValueIfFormValid() {
        if (this.form.valid) {
            if (this.inputControl.value !== null) {
                const value = this.inputControl.value;
                this.initialValue = value;
                return value.instituteCode;
            }
        }
    }
}
