import { Component, OnInit, ViewChild } from '@angular/core';
import { InlineEditListComponent } from 'src/app/shared/components/inline-edit-list/inline-edit-list.component';
import { ScaleCategories } from 'src/app/shared/entities/scale.model';


@Component({
  selector: 'kusunoki2-inline-scale-valid-values',
  templateUrl: './inline-scale-valid-values.component.html',
  styleUrls: ['./inline-scale-valid-values.component.scss']
})
export class InlineScaleValidValuesComponent  extends InlineEditListComponent {
    @ViewChild('form', {static: false}) form;

    setInitialValue() {
        this.initialValue = this.value.slice();
        this.itemToAdd = new ScaleCategories();
    }

    addItem(value) {
        if (value) {
            const newValidValues = this.value.concat({'value': value.value,
                                                      'description': value.description});
            this.inputControl.setValue(newValidValues);

            this.itemToAdd.value = undefined;
            this.itemToAdd.description = undefined;

            this.form.control.markAsPristine();
            this.form.control.markAsUntouched();

        }
    }
}