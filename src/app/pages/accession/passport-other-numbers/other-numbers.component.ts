import { Component, EventEmitter, Input, OnInit, Output,
         ViewChildren, QueryList, AfterViewChecked } from '@angular/core';
import { AccessionId } from 'src/app/shared/entities/accession.model';
import { OtherNumberComponent } from './other-number.component';



@Component({
    selector: 'kusunoki2-other-numbers',
    templateUrl: './other-numbers.component.html',
    styleUrls: ['./other-numbers.component.scss'],
})
export class OtherNumbersComponent implements OnInit, AfterViewChecked {
    childrenComponents: OtherNumberComponent[];

    @ViewChildren(OtherNumberComponent)
    otherNumberChildren: QueryList<OtherNumberComponent>;

    @Input() otherNumbers: AccessionId[];
    @Input() editMode: boolean;
    @Input() createMode: boolean;
    @Output() validationStateEvent = new EventEmitter<any>();
    config = {name: 'otherNumbers'};
    allInputAreValid: boolean;
    inputsValidStatuses = {};
    initialValue: AccessionId[];

    ngOnInit() {
        this.initialValue = this.otherNumbers.map(x => Object.assign({}, x));
    }

    ngAfterViewChecked() {
        this.childrenComponents = this.otherNumberChildren.toArray();
    }

    checkAllInputAreValid() {
        return Object.keys(this.inputsValidStatuses)
                    .map(k => this.inputsValidStatuses[k])
                    .every(v => v);
    }

    checkFormValid(event) {
        Object.assign(this.inputsValidStatuses, event);
        this.allInputAreValid = this.checkAllInputAreValid();
        this.validationStateEvent.emit({'otherNumbers': this.allInputAreValid});
    }

    getValueIfFormValid() {
        if (this.allInputAreValid) {
            const validFormData = [];
            for (const component of this.childrenComponents) {
                const value = component.getValueIfFormValid();
                if (value !== undefined) {
                    validFormData.push(value);
                }
            }
            return validFormData;
        }
    }

    resetForm() {
        this.otherNumbers = this.initialValue;
        this.editMode = false;
    }

    clearForm() {
        for (const children of this.childrenComponents) {
            children.clearForm();
        }
    }

    addInputWidget() {
        this.otherNumbers.push(new AccessionId());
    }

    removeInputWidget(index) {
        this.otherNumbers.splice(index, 1);
        delete this.inputsValidStatuses[index];
    }
}

