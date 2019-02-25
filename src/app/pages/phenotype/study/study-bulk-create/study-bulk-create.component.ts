import { Component } from '@angular/core';
import { BulkCreateComponent } from 'src/app/shared/components/bulk-create/bulk-create.component';

@Component({
    selector: 'kusunoki2-study-bulk-create',
    templateUrl: '../../../../shared/components/bulk-create/bulk-create.component.html'
})
export class StudyBulkCreateComponent extends BulkCreateComponent {
    entityType = 'study';
    entityTypePlural = 'studies';
}
