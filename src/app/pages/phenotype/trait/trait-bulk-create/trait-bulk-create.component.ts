import { Component, OnInit } from '@angular/core';
import { BulkCreateComponent } from 'src/app/shared/components/bulk-create/bulk-create.component';

@Component({
  selector: 'kusunoki2-trait-bulk-create',
  templateUrl: './trait-bulk-create.component.html',
  styleUrls: ['./trait-bulk-create.component.scss']
})
export class TraitBulkCreateComponent extends BulkCreateComponent {
    entityType = 'trait';
}
