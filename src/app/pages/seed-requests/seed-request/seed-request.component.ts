import { Component, OnInit, ViewChildren, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { SeedRequestService } from 'src/app/pages/seed-requests/services/seed-request.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { SeedRequest } from 'src/app/pages/seed-requests/entities/seed_request.model';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { InlineAutoCountryComponent } from '../../accession/country/inline-auto-country/inline-auto-country.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { AppUrls } from 'src/app/pages/appUrls';
import * as moment from 'moment';
import { Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Observable, of } from 'rxjs';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { GoogleReCaptcha2Directive } from 'src/app/shared/directives/google-re-captcha2.directive';


@Component({
    selector: 'kusunoki2-seed-request',
    templateUrl: './seed-request.component.html',
    styleUrls: ['./seed-request.component.scss']
})
export class SeedRequestComponent implements OnInit  {
    appConfig: AppConfig;
    allInputAreValid: boolean;
    inputsValidStatuses = {};
    appUrls = AppUrls;
    userToken;
    requestedAccessions: Observable<object[]>;
    currentLanguage: string;
    requestInProgress = false;
    @Input() request: SeedRequest;
    @Input() editMode = false;
    @Output() createdRequests = new EventEmitter<SeedRequest[]>();

    @ViewChildren(InlineEditComponent) inlineForms;
    @ViewChildren(InlineAutoCountryComponent) inlineAutoCountries;
    @ViewChild(GoogleReCaptcha2Directive) reCatpchaDir;

    config = {
        request_uid: { is_required: true, is_editable: true, name: 'request_uid' },
        name: { is_required: true, is_editable: true, name: 'name' },
        type: { is_required: true, is_editable: true, name: 'type' },
        institution: { is_required: true, is_editable: true, name: 'institution' },
        address: { is_required: true, is_editable: true, name: 'address' },
        city: { is_required: true, is_editable: true, name: 'city' },
        postal_code: { is_required: true, is_editable: true, name: 'postal_code' },
        region: { is_required: true, is_editable: true, name: 'region' },
        country: { is_required: true, is_editable: true, name: 'country' },
        email: {
            is_required: true, is_editable: true, name: 'email',
            text_input_type: 'email',
            validators: [Validators.email]
        },
        aim: {
            is_required: true, is_editable: true, name: 'aim',
            widget: { type: 'text_area', rows: 3 }
        },
        comments: {
            is_required: false, is_editable: true, name: 'comments',
            widget: { type: 'text_area', rows: 3 }
        },
    };

    constructor(private seedRequestService: SeedRequestService,
        public shoppingCartService: ShoppingCartService,
        private appConfigService: AppConfigService,
        private readonly statusService: StatusService,
        private readonly router: Router,
        public dialog: MatDialog,
        private currentUserService: CurrentUserService) {

        this.appConfig = this.appConfigService.getConfig();
        this.currentLanguage = this.appConfig.currentLanguage;
    }

    ngOnInit(): void {
        if (this.editMode) {
            this.requestedAccessions = this.shoppingCartService.accessions;
        } else {
            this.requestedAccessions = of(this.request.data.accessions);
        }
        this.userToken = this.currentUserService.currentUserSubject.value;

    }


    checkAllInputAreValid() {
        return Object.keys(this.inputsValidStatuses)
            .map(k => this.inputsValidStatuses[k])
            .every(v => v);
    }

    checkFormValid(event) {
        Object.assign(this.inputsValidStatuses, event);
        this.allInputAreValid = this.checkAllInputAreValid();
    }

    getFormValidData() {
        const formValidData = {};
        this.inlineForms.map(inlineForm => {
            formValidData[inlineForm.config.name] = inlineForm.getValueIfFormValid();
        });
        this.inlineAutoCountries.map(inlineForm => {
            formValidData[inlineForm.config.name] = inlineForm.getValueIfFormValid();
        });
        this.shoppingCartService.accessions
            .subscribe(accs => formValidData['accessions'] = accs);

        return formValidData;
    }
    getModelFromFormValidData() {
        const formValidData = this.getFormValidData();
        if (formValidData) {
            const request = new SeedRequest();
            request.data.name = formValidData['name'];
            request.data.type = formValidData['type'];
            request.data.institution = formValidData['institution'];
            request.data.address = formValidData['address'];
            request.data.city = formValidData['city'];
            request.data.postal_code = formValidData['postal_code'];
            request.data.region = formValidData['region'];
            request.data.country = formValidData['country'];
            request.data.email = formValidData['email'];
            request.data.aim = formValidData['aim'];
            request.data.comments = formValidData['comments'];
            request.data.request_date = moment();
            request.data.accessions = formValidData['accessions'];
            return request;
        }

    }
    resetForm() {
        this.inlineForms.map(inlineForm => inlineForm.resetForm());
        this.inlineAutoCountries.map(inlineForm => inlineForm.resetForm());
    }
    createRequest() {
        const request = this.getModelFromFormValidData();
        if (request) {
            const reCaptchaToken = this.reCatpchaDir.getValueIfFormValid();
            this.requestInProgress = true;
            this.seedRequestService.create(request.getApiDocument(), reCaptchaToken)
                .subscribe(
                    (createdRequests: SeedRequest[]) => {
                        this.requestInProgress = false;
                        this.editMode = false;
                        this.createdRequests.emit(createdRequests);
                        this.request = undefined;
                        this.shoppingCartService.removeAllFromCart();
                        this.statusService.info('Request sucessfully created');

                    },
                    (error) => {
                        console.log(error);
                        this.requestInProgress = false;
                    }
                );
        } else {
            this.statusService.error('Seed request data is not valid');
        }
    }
    deleteRequest() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {
                type: 'Seed Request',
                description: `Seed Request: ${this.request.data.request_uid}`
            }
        });
        dialogRef.afterClosed().subscribe(doDelete => {
            if (doDelete) {
                this.seedRequestService.delete(this.request.data.request_uid)
                    .subscribe(
                        response => {
                            this.statusService.info('Request sucessfully deleted');
                            this.router.navigate([AppUrls.seed_requests]);
                        },
                        error => this.statusService.error(error.error.detail)
                    );
            }
        });
    }
}

