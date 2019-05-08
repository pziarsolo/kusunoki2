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
        {name: 'TYPE', description: ['Type of the institute: Can be Gobernmental, Genebank, Project...'],
            mandatory: false},
        {name: 'STREET_POBE', description: ['Address of the institute'], mandatory: false},
        {name: 'CITY_STATE', description: ['City of the institute'], mandatory: false},
        {name: 'ZIP_CODE', description: ['Zip code of the institute'], mandatory: false},
        {name: 'PHONE', description: ['Phone number of the institute'], mandatory: false},
        {name: 'EMAIL', description: ['Email of contact of the institute'], mandatory: false},
        {name: 'URL', description: ['Url of the institute\' web page'], mandatory: false},
        {name: 'MANAGER', description: ['The database manager'], mandatory: false},
    ];
}

