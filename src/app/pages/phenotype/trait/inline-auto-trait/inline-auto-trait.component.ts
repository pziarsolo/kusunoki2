import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, SimpleChanges, Output, EventEmitter, Input } from '@angular/core';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { Observable, Subscription, of } from 'rxjs';
import { Trait } from 'src/app/shared/entities/trait.model';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { TraitService } from 'src/app/shared/services/trait.service';
import { startWith, filter, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'kusunoki2-inline-auto-trait',
  templateUrl: './inline-auto-trait.component.html',
  styleUrls: ['./inline-auto-trait.component.scss']
})
export class InlineAutoTraitComponent  extends InlineEditComponent implements OnChanges, AfterViewInit {
    suggestions: Observable<Trait[]>;
    subscription: Subscription;
    @Input() userCanCreate: boolean;
    @Output() AddNewTraitRequested  = new EventEmitter<any>();
    @ViewChild(MatAutocompleteTrigger) trigger;

    constructor(public service: TraitService) {
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
                    (response: Trait) => {
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
