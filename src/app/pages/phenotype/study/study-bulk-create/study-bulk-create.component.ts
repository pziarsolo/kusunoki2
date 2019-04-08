import { Component } from '@angular/core';
import { BulkCreateComponent } from 'src/app/shared/components/bulk-create/bulk-create.component';

@Component({
    selector: 'kusunoki2-study-bulk-create',
    templateUrl: '../../../../shared/components/bulk-create/bulk-create.component.html',
  styleUrls: ['../../../../shared/components/bulk-create/bulk-create.component.scss']
})
export class StudyBulkCreateComponent extends BulkCreateComponent {
    entityType = 'study';
    entityTypePlural = 'studies';
    exampleFileUrl = 'assets/upload_examples/studies.xlsx';
    fieldConfiguration = [
        {name: 'NAME', description: ['The name of the study, must be unique'], mandatory: true},
        {name: 'DESCRIPTION', description: ['The description of the study'], mandatory: true},
        {name: 'START_DATE', description: ['Start date of the study. Format: DD/MM/YY'], mandatory: false},
        {name: 'END_DATE', description: ['End date of the study. Format: DD/MM/YY'], mandatory: false},
        {name: 'LOCATION', description: ['Location where the study was made'], mandatory: false},
        {name: 'CONTACT', description: ['Responsable of the study'], mandatory: false},
        {name: 'PROJECT_NAME', description: ['If the study belongs to a project and the project is already uploaded'], mandatory: false},
        {name: 'SEASON', description: ['Season in wich the study was made'], mandatory: false},
        {name: 'INSTITUTION', description: ['The institution responsable of the study'], mandatory: false},
    ];
}

