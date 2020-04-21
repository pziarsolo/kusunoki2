import { Component } from '@angular/core';
import { BulkCreateComponent } from 'src/app/shared/components/bulk-create/bulk-create.component';


@Component({
  selector: 'kusunoki2-accessionset-bulk-create',
  templateUrl: '../../../../shared/components/bulk-create/bulk-create.component.html'
})
export class AccessionSetBulkCreateComponent extends BulkCreateComponent {
    entityType = 'accessionset';
    entityTypePlural = 'accessionsets';
    exampleFileUrl = 'assets/upload_examples/accessionsets.xlsx';
    fieldConfiguration = [
        {name: 'INSTCODE', description: ['Accession set holder institute'], mandatory: true},
        {name: 'ACCESETNUMB', description: ['Accessoin set number. Must be unique for the institute'], mandatory: true},
        {name: 'ACCESSIONS', mandatory: true,
         description: ['List of accessions that are part of the accession set separated by ";" ',
                       'Accession format is: "INSTCODE:ACCESSION_NUMBER',
                       'Accessions must be already uploaded in the database']},

    ];
}
