import { Component } from '@angular/core';
import { BulkCreateComponent } from 'src/app/shared/components/bulk-create/bulk-create.component';


@Component({
  selector: 'kusunoki2-institute-bulk-create',
  templateUrl: '../../../../shared/components/bulk-create/bulk-create.component.html'
})
export class InstituteBulkCreateComponent extends BulkCreateComponent {
    entityType = 'institute';
    entityTypePlural = 'institutes';
    exampleFileUrl = 'assets/upload_examples/institutes.xlsx';
    fieldConfiguration = [
        {name: 'INST_CODE', description: ['FAO institute code'], mandatory: true},
        {name: 'FULL_NAME', description: ['Name of the institute'], mandatory: true},
        {name: 'TYPE', description: ['Type of the institute: Can be Gobernmental, genebank...'],
            mandatory: false},

    ];
}

