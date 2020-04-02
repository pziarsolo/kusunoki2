import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SeedPetitionService } from 'src/app/shared/services/seed-petition.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { SeedPetition } from 'src/app/shared/entities/seed_petition.model';
import { InlineEditComponent } from 'src/app/shared/components/inline-edit/inline-edit.component';
import { InlineAutoCountryComponent } from '../../accession/country/inline-auto-country/inline-auto-country.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { AppUrls } from 'src/app/pages/appUrls';
import * as moment from 'moment';
import { Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Observable, of } from 'rxjs';
import { async } from '@angular/core/testing';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';


@Component({
  selector: 'kusunoki2-seed-petition',
  templateUrl: './seed-petition.component.html',
  styleUrls: ['./seed-petition.component.scss']
})
export class SeedPetitionComponent implements OnInit  {
    appConfig: AppConfig;
    allInputAreValid: boolean;
    inputsValidStatuses = {};
    appUrls = AppUrls;
    userToken;
    requestedAccessions: Observable<object[]>;
    createdOK = false;

    @Input() petition: SeedPetition;
    @Input() editMode = false;

    @ViewChildren(InlineEditComponent) inlineForms;
    @ViewChildren(InlineAutoCountryComponent) inlineAutoCountries;

    config = {
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

    constructor(private seedPetitionService: SeedPetitionService,
        public shoppingCartService: ShoppingCartService,
        private appConfigService: AppConfigService,
        private readonly statusService: StatusService,
        private readonly router: Router,
        public dialog: MatDialog,
        private currentUserService: CurrentUserService) {

        this.appConfig = this.appConfigService.getConfig();
    }

    ngOnInit(): void {
        if (this.editMode) {
            this.requestedAccessions = this.shoppingCartService.accessions;
        } else {
            this.requestedAccessions = of(this.petition.data.accessions);
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
        console.log(formValidData);
        if (formValidData) {
            const petition = new SeedPetition();
            petition.data.name = formValidData['name'];
            petition.data.type = formValidData['type'];
            petition.data.institution = formValidData['institution'];
            petition.data.address = formValidData['address'];
            petition.data.city = formValidData['city'];
            petition.data.postal_code = formValidData['postal_code'];
            petition.data.region = formValidData['region'];
            petition.data.country = formValidData['country'];
            petition.data.email = formValidData['email'];
            petition.data.aim = formValidData['aim'];
            petition.data.comments = formValidData['comments'];
            petition.data.petition_date = moment();
            petition.data.accessions = formValidData['accessions'];
            return petition;
        }

    }
    resetForm() {
        this.inlineForms.map(inlineForm => inlineForm.resetForm());
        this.inlineAutoCountries.map(inlineForm => inlineForm.resetForm());
    }
    createPetition() {
        const petition = this.getModelFromFormValidData();
        if (petition) {
            this.seedPetitionService.create(petition.getApiDocument())
                .subscribe(
                    (createdPetition: SeedPetition) => {
                        this.editMode = false;
                        this.createdOK = true;
                        this.petition = createdPetition;
                        this.requestedAccessions = of(this.petition.data.accessions);
                        this.shoppingCartService.removeAllFromCart();
                        this.statusService.info('Petition sucessfully created');
                    },
                    (error) => console.log(error)
                );
        } else {
            this.statusService.error('Seep petition data is not valid');
        }
    }
    deletePetition() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {
                type: 'Seed Petition',
                description: `Seed Petition: ${this.petition.data.petition_id}`
            }
        });
        dialogRef.afterClosed().subscribe(doDelete => {
            if (doDelete) {
                this.seedPetitionService.delete(this.petition.data.petition_id)
                    .subscribe(
                        response => {
                            this.statusService.info('Petition sucessfully deleted');
                            this.router.navigate([AppUrls.seed_petitions]);
                        },
                        error => this.statusService.error(error.error.detail)
                    );
            }
        });
    }
}

