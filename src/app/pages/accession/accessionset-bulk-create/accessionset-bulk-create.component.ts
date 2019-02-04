import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { StatusService } from '../../../shared/StatusModule/status.service';
import { AccessionSetService } from '../../../shared/services/accessionset.service';
import { AppUrls } from '../../appUrls';
import { Router } from '@angular/router';


@Component({
  selector: 'kusunoki2-accessionset-bulk-create',
  templateUrl: './accessionset-bulk-create.component.html',
  styleUrls: ['./accessionset-bulk-create.component.scss']
})
export class AccessionSetBulkCreateComponent {
    @ViewChild('file') file;
    errors: String[];
    uploadedFile: File;
    num_uploaded: Number;

    uploadTried = false;
    processing = false;
    uploadSuccessful;

    constructor(private accessionSetService: AccessionSetService,
                private statusService: StatusService,
                private router: Router) {}

    onFileAdded() {
        this.uploadTried = true;
        this.processing = true;
        this.errors = undefined;
        this.uploadedFile = this.file.nativeElement.files[0];

        this.accessionSetService.bulkCreate(this.uploadedFile)
            .subscribe(
                (event) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        // calculate the progress percentage
                        const percentDone = Math.round(100 * event.loaded / event.total);
                        // pass the percentage into the progress-stream
                    } else if (event instanceof HttpResponse) {
                        this.processing = false;
                        this.uploadSuccessful = true;
                        const task_id = event.body.task_id;
                        this.statusService.info('Task sendend. Redirecting to task result page');
                        this.router.navigate(['/', AppUrls.tasks, task_id]);
                    }

                },
                (error) => {
                    console.log('Accessionset upload errors', error);
                    this.processing = false;
                    this.uploadSuccessful = false;
                    this.errors = error.error.details;
                    this.statusService.error('Errors uploading accessionsets');
                });

    }

}
