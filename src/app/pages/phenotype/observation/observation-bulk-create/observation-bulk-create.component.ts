import { Component } from '@angular/core';
import { BulkCreateComponent } from 'src/app/shared/components/bulk-create/bulk-create.component';

@Component({
  selector: 'kusunoki2-observation-bulk-create',
  templateUrl: '../../../../shared/components/bulk-create/bulk-create.component.html'
})
export class ObservationBulkCreateComponent extends BulkCreateComponent {
    entityType = 'observation';
}
