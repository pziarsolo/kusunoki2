import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { Subject } from 'rxjs';

import { InstituteService } from 'src/app/shared/services/institute.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { DataSource } from 'src/app/shared/entities/data_source.model';


@Component({
  selector: 'kusunoki2-institute-bulk-create',
  templateUrl: './institute-bulk-create.component.html',
  styleUrls: ['./institute-bulk-create.component.scss']
})
export class InstituteBulkCreateComponent {
    @ViewChild('file') file;
    progressSubject = new Subject();
    progress = this.progressSubject.asObservable();

    errors: String[];
    uploadedFile: File;
    num_uploaded: Number;

    uploadTried = false;
    processing = false;
    uploadSuccessful;

    constructor(private instituteService: InstituteService,
                private statusService: StatusService) {}


    onFileAdded() {
        this.uploadTried = true;
        this.processing = true;
        this.errors = undefined;
        this.uploadedFile = this.file.nativeElement.files[0];
        const dataSource = new DataSource();

        this.instituteService.bulkCreate(this.uploadedFile)
            .subscribe(
                (event) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        // calculate the progress percentage
                        const percentDone = Math.round(100 * event.loaded / event.total);
                        // pass the percentage into the progress-stream
                        this.progressSubject.next(percentDone);

                    } else if (event instanceof HttpResponse) {
                        this.num_uploaded = event.body.length;
                        this.progressSubject.complete();
                        this.processing = false;
                        this.uploadSuccessful = true;
                        this.statusService.info('Institutes added sucessfully');
                    }
                },
                error => {
                    this.processing = false;
                    this.uploadSuccessful = false;
                    this.errors = error.error.details;
                    this.statusService.error('Errors processing Institutes');
                });
    }
}
