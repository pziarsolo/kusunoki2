import { Component, ViewChild } from '@angular/core';
import { BulkCreateComponent } from 'src/app/shared/components/bulk-create/bulk-create.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AppUrls } from 'src/app/pages/appUrls';
import { ObservationService } from 'src/app/shared/services/observation.service';

@Component({
  selector: 'kusunoki2-observation-bulk-create',
  templateUrl: './observation-bulk-create.component.html'
})
export class ObservationBulkCreateComponent {
    traitsInColumn = false;
    createObservationUnits: boolean;
    @ViewChild('file', {static: false}) file;
    @ViewChild('file2', {static: false}) file2;
    filename: string;
    filename2: string;
    errors;
    uploadedFile: File;
    uploadedFile2: File;
    num_uploaded: Number;

    uploadTried = false;
    processing = false;
    uploadSuccessful;
    icon1 = false;
    icon2 = false;

    obsPerRowfieldConfiguration = [
        {name: 'OBSERVATION_VARIABLE', description: [
            'Identifier (name) of trait methodology used to annotate the observation. It defines the scale and trait used.'], mandatory: true},
        {name: 'OBSERVATION_UNIT', description: [
            'Identifier(name) of the observation unit. It must be already added to the database.',
            'It defines what has been observed (accession) in witch study and the observation level'], mandatory: true},
        {name: 'CREATION_TIME', description: ['UTC time stamp of the observation creation'], mandatory: false},
        {name: 'OBSERVER', description: ['Name of the person that has made the observation'], mandatory: false},
        {name: 'VALUE', description: ['The value of the observation'], mandatory: true},
    ];

    accPerRowfieldConfiguration = [
        {name: 'ACCESSION', description: [
        'Accession of the observed entity. Forma: INSTITUTE_CODE:ACCESSION_NUMBER: ej: ESP000:BGV000000'], mandatory: true},
    {name: 'STUDY', description: [
        'Identifier(name) of the study. It must be already added to the database.',
        'It describes the study in witch the observations has been taken'], mandatory: true},
    {name: 'TRAITS', description: [
       'One trait per column. Tha trait methodology has to be already in the db.',
       'The name have to match with the name in the db',
       'You can have more than one value per accession per trait. The have to be separated by ";"',
       'example: 1;2 or 3.4 or 90'], mandatory: true}
    ];

    constructor(
        private statusService: StatusService,
        private router: Router,
        private service: ObservationService) {
    }

    onFileAdded1() {
        this.uploadedFile = this.file.nativeElement.files[0];
        this.filename = this.uploadedFile.name;
        this.uploadedFile2 = undefined;
        this.filename2 = undefined;
    }
    onFileAdded2() {
        this.uploadedFile2 = this.file2.nativeElement.files[0];
        this.filename2 = this.uploadedFile2.name;
        this.uploadedFile = undefined;
        this.filename = undefined;
    }
    toogle_button1() {
        this.icon1 = !this.icon1;
    }
    toogle_button2() {
        this.icon2 = !this.icon2;
    }
    OnSubmit() {
        let choosenFile;
        if (this.uploadedFile === undefined) {
            choosenFile = this.uploadedFile2;
            this.traitsInColumn = true;
        } else if ((this.uploadedFile2 === undefined)) {
            choosenFile = this.uploadedFile;
        }
        this.uploadTried = true;
        this.processing = true;
        this.errors = undefined;
        let conf;
        if (this.traitsInColumn) {
            conf = {traits_in_columns: this.traitsInColumn,
                    create_observation_units: 'foreach_observation'};
        } else {
            conf = {};
        }
        this.service.bulkCreate(choosenFile, conf)
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