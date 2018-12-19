import { BaseInlinesForm2Component } from 'src/app/shared/components/base-inlines2-form/base-inlines-form2.component';
import { Input, Component } from '@angular/core';

@Component({
    selector: 'kusunoki2-other-number',
    templateUrl: './other-number.component.html' ,
    styles: ['mat-list-item-content {padding-left:0;}']
})
export class OtherNumberComponent extends BaseInlinesForm2Component {
    childrenConfig = {
        germplasmNumber: {
            name: 'germplasmNumber',
            is_editable: true,
            is_required: true},
    instituteCode: {
        name: 'instituteCode',
        is_editable: true,
        is_required: true}
    };

}
