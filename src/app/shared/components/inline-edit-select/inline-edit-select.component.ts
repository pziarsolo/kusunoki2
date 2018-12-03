import { Component, Input, SimpleChanges, OnChanges, ViewEncapsulation } from '@angular/core';
import { InlineEditComponent } from '../inline-edit/inline-edit.component';

@Component({
    selector: 'kusunoki2-inline-edit-select',
    templateUrl: './inline-edit-select.component.html',
    styleUrls: ['./inline-edit-select.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InlineEditSelectComponent extends InlineEditComponent  implements OnChanges {
    @Input() choices;

    constructor() {
        super();
    }

    afterOnInit() {
        if (this.value) {
            this.initialValue = this.choices.filter(item => item.code === Number(this.value) || item.code === this.value)[0];
            this.inputControl.setValue(this.initialValue);
            const action = this.editMode ? 'enable' : 'disable';
            this.inputControl[action]();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('editMode' in changes && this.inputControl) {
            const action = this.editMode ? 'enable' : 'disable';
            this.inputControl[action]();
        }
    }

    getValueIfFormValid() {
        return super.getValueIfFormValid().code;
    }
}
