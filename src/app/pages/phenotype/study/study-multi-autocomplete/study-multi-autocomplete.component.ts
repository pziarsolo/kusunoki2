import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Study } from 'src/app/shared/entities/study.model';
import { StudyService } from 'src/app/shared/services/study.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'kusunoki2-study-multi-autocomplete',
  templateUrl: './study-multi-autocomplete.component.html',
  styleUrls: ['./study-multi-autocomplete.component.scss']
})
export class StudyMultiAutocompleteComponent {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    items: string[] = [];
    suggested: Observable<Study[]>;
    input;
    placeholder = 'Studies to search for...';

    @ViewChild('inputElement', {static: false}) inputElement: ElementRef;
    @ViewChild('auto', {read: MatAutocompleteTrigger, static: false}) studyTrigger: MatAutocompleteTrigger;

    constructor(private service: StudyService) {}

    filter(name) {
        return this.service.list({name_icontains: name, fields: 'name'})
            .pipe(map(response => response.body));
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
          this.items.push(value);
        }
        // Reset the input value
        if (input) {
          input.value = '';
        }
    }

    remove(item: string): void {
        const index = this.items.indexOf(item);
        if (index >= 0) {
          this.items.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.items.push(event.option.viewValue);
        this.inputElement.nativeElement.value = '';
        this.input = null;
    }

    formReset() {
        this.items = [];
        this.inputElement.nativeElement.value = '';
        this.input = null;
    }
    getNameFromModel(data) {
        return data.data.name;
    }

}
