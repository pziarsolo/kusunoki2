import { Component, Input, SimpleChanges, OnChanges, ViewEncapsulation, ChangeDetectorRef, OnInit } from '@angular/core';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'kusunoki2-inline-edit-select',
    templateUrl: './inline-edit-select.component.html',
    styleUrls: ['./inline-edit-select.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InlineEditSelectComponent extends InlineEditComponent  implements OnChanges {
    @Input() choices;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    afterOnInit() {
        if (this.value) {
            this.initialValue = this.choices.filter(item => item.code === Number(this.value) || item.code === this.value)[0];
            this.inputControl.setValue(this.initialValue);
            const action = this.editMode ? 'enable' : 'disable';
            this.inputControl[action]({onlySelf: true });
            this.changeDetectorRef.detectChanges();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('editMode' in changes && this.inputControl) {
            const action = this.editMode ? 'enable' : 'disable';
            this.inputControl[action]({onlySelf: true });
            this.changeDetectorRef.detectChanges();
        }
    }
    getValueIfFormValid() {
        if (this.inputControl.valid) {
            if (this.inputControl.value !== null &&
                this.inputControl.value !== undefined &&
                this.inputControl.value !== 'null') { // this last one is to reset select widtget value
                return this.inputControl.value.code;
            }
        }
    }
}
