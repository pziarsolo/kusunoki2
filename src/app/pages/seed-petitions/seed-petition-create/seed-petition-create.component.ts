import { Component, OnInit, ViewChildren } from '@angular/core';
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
import { EmailValidator, Validators } from '@angular/forms';


@Component({
    selector: 'kusunoki2-seed-petition-create',
    templateUrl: './seed-petition-create.component.html',
    styleUrls: ['./seed-petition-create.component.scss']
})
export class SeedPetitionCreateComponent implements OnInit {
    appConfig: AppConfig;
    allInputAreValid: boolean;
    inputsValidStatuses = {};
    petition: SeedPetition;
    editMode: boolean;

    constructor(private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
    }

    ngOnInit(): void {
        this.petition = new SeedPetition();
        this.editMode = true;
    }


}
