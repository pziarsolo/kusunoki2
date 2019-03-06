import { Component, OnInit, AfterViewInit, OnChanges, Output, ViewChild, SimpleChanges, EventEmitter, Input } from '@angular/core';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { Observable, Subscription, of } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { Scale } from 'src/app/shared/entities/scale.model';
import { startWith, filter, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { ScaleService } from 'src/app/shared/services/scale.service';

@Component({
  selector: 'kusunoki2-inline-auto-scale',
  templateUrl: './inline-auto-scale.component.html',
  styleUrls: ['./inline-auto-scale.component.scss']
})
export class InlineAutoScaleComponent  extends InlineEditComponent implements OnChanges, AfterViewInit {
    suggestions: Observable<Scale[]>;
    subscription: Subscription;
    @Input() userCanCreate: boolean;
    @Output() AddNewScaleRequested  = new EventEmitter<any>();
    @ViewChild(MatAutocompleteTrigger) trigger;

    constructor(public service: ScaleService) {
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
            this.initialValue = null;
        } else if (typeof this.value === 'string') {
            this.subscription = this.service.retrieve(this.value)
                .subscribe(
                    (response: Scale) => {
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
                if (typeof(this.value) === 'string') {
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
            return this.service.list({name__icontains: inputVal})
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
        if (entity.name === undefined) {
            return entity;
        }
        return `${entity.name} (${entity.description})`;
    }

    getValueIfFormValid() {
        if (this.form.valid) {
            if (this.inputControl.value !== null) {
                const value = this.inputControl.value;
                this.initialValue = value;
                return value.name;
            }
        }
    }
}
