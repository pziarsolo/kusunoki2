import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AppUrls } from 'src/app/pages/appUrls';
import { ServiceLocatorService } from '../../services/service-locator.service';
import { AppConfigService } from '../../services/app-config.service';
import { Router } from '@angular/router';
import { StatusService } from '../../StatusModule/status.service';
import { StudyService } from '../../services/study.service';
import { ObservationService } from '../../services/observation.service';
import { InstituteService } from '../../services/institute.service';
import { AccessionSetService } from '../../services/accessionset.service';
import { AccessionService } from '../../services/accession.service';
import { TraitService } from '../../services/trait.service';

@Component({
    selector: 'kusunoki2-bulk-create',
    templateUrl: './bulk-create.component.html',
    styleUrls: ['./bulk-create.component.scss']
})
export class BulkCreateComponent implements OnInit {
    @ViewChild('file', { static: false }) file;
    errors;
    uploadedFile: File;
    num_uploaded: Number;

    uploadTried = false;
    processing = false;
    uploadSuccessful;

    service;
    entityType: string;
    entityTypePlural: string;
    fieldConfiguration = [];
    exampleFileUrl: string;
    icon = false;

    constructor(
        protected serviceLocator: ServiceLocatorService,
        private statusService: StatusService,
        private router: Router) { }


    toogle_button() {
        this.icon = !this.icon;
    }
    ngOnInit() {
        if (this.entityType === 'accession') {
            this.service = this.serviceLocator.injector.get(AccessionService);
        } else if (this.entityType === 'accessionset') {
            this.service = this.serviceLocator.injector.get(AccessionSetService);
        } else if (this.entityType === 'institute') {
            this.service = this.serviceLocator.injector.get(InstituteService);
        } else if (this.entityType === 'observation') {
            this.service = this.serviceLocator.injector.get(ObservationService);
        } else if (this.entityType === 'study') {
            this.service = this.serviceLocator.injector.get(StudyService);
        } else if (this.entityType === 'trait') {
            this.service = this.serviceLocator.injector.get(TraitService);
        }
    }
    onFileAdded() {
        this.uploadTried = true;
        this.processing = true;
        this.errors = undefined;
        this.uploadedFile = this.file.nativeElement.files[0];
        this.service.bulkCreate(this.uploadedFile)
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
                    this.processing = false;
                    this.uploadSuccessful = false;
                    if (errors.error.length) {
                        this.errors = errors.error.map(item => item.detail);
                    } else {
                        this.errors = errors.error.detail;
                    }
                    this.statusService.error('Check the errors');
                }
            );
    }

    rePaintDialog() {
        this.uploadTried = false;
        this.uploadSuccessful = undefined;
    }
}
