import { Component, ViewChild } from '@angular/core';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AppUrls } from 'src/app/pages/appUrls';
import { ObservationImageService } from 'src/app/shared/services/observation_image.service';

@Component({
  selector: 'kusunoki2-observation-image-bulk-create',
  templateUrl: './observation-image-bulk-create.component.html',
})
export class ObservationImageBulkCreateComponent {
    traitsInColumn = false;
    createObservationUnits: boolean;
    @ViewChild('file') file;
    filename: string;
    errors;
    uploadedFile: File;
    num_uploaded: Number;

    uploadTried = false;
    processing = false;
    uploadSuccessful;

    constructor(
        private statusService: StatusService,
        private router: Router,
        private service: ObservationImageService) {
    }

    onFileAdded() {
        this.uploadedFile = this.file.nativeElement.files[0];
        this.filename = this.uploadedFile.name;
    }

    OnSubmit() {
        this.uploadTried = true;
        this.processing = true;
        this.errors = undefined;
        let conf;
        conf = {create_observation_units: 'foreach_observation'};

        this.service.bulkCreate(this.uploadedFile, conf)
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
                (errors) => {
                    console.log(errors);
                    this.processing = false;
                    this.uploadSuccessful = false;
                    this.statusService.error('Check the errors');
                    this.errors = errors.error;

                }
            );
    }
    rePaintDialog() {
        this.uploadTried = false;
        this.uploadSuccessful = false;
    }
}
