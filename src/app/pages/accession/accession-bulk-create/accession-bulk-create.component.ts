import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { Subject } from 'rxjs';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { DataSource } from 'src/app/shared/entities/accession.model';

@Component({
  selector: 'kusunoki2-accession-bulk-create',
  templateUrl: './accession-bulk-create.component.html',
  styleUrls: ['./accession-bulk-create.component.scss']
})
export class AccessionBulkCreateComponent {

    @ViewChild('file') file;
    appConfig: AppConfig;
    errors: String[];
    uploadedFile: File;
    num_uploaded: Number;

    uploadTried = false;
    processing = false;
    uploadSuccessful;

    constructor(private accessionService: AccessionService,
                private appConfigService: AppConfigService,
                private statusService: StatusService) {
        this.appConfig = this.appConfigService.appConfig;
    }

    onFileAdded() {
        this.uploadTried = true;
        this.processing = true;
        this.errors = undefined;
        this.uploadedFile = this.file.nativeElement.files[0];
        const dataSource = new DataSource();
        dataSource.code = this.appConfig.defaultDataSource.code;
        dataSource.kind = this.appConfig.defaultDataSource.kind;

        this.accessionService.bulkCreate(dataSource, this.uploadedFile)
            .subscribe(
                (event) => {
                    console.log(event);
                    if (event.type === HttpEventType.UploadProgress) {
                        // calculate the progress percentage
                        const percentDone = Math.round(100 * event.loaded / event.total);
                        // pass the percentage into the progress-stream
                    } else if (event instanceof HttpResponse) {
                        this.num_uploaded = event.body.length;
                        // Close the progress-stream if we get an answer form the API
                        // The upload is complete
                        this.processing = false;
                        this.uploadSuccessful = true;
                        this.statusService.info('Accessions sucessfully added');
                    }
                },
                (error) => {
                    console.log('accession errors', error);
                    this.processing = false;
                    this.uploadSuccessful = false;
                    this.errors = error.error.details;
                    this.statusService.error('Check the errors');
                }
            );
    }

}
