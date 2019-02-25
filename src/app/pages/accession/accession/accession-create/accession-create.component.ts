import { Component, OnInit } from '@angular/core';
import { Accession, Passport } from 'src/app/shared/entities/accession.model';
import * as moment from 'moment';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';

@Component({
  selector: 'kusunoki2-accession-create',
  templateUrl: 'accession-create.component.html'

})
export class AccessionCreateComponent implements OnInit {
    accession: Accession;
    editMode: Boolean;
    createMode: Boolean;
    appConfig: AppConfig;

    constructor(private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.appConfig;
    }

    ngOnInit() {
        this.accession = new Accession();
        this.accession.data.is_available = false;
        this.accession.data.passports = [new Passport()];
        this.accession.data.passports[0].dataSource.code = this.appConfig.defaultDataSource.code;
        this.accession.data.passports[0].dataSource.kind = this.appConfig.defaultDataSource.kind;
        this.accession.data.passports[0].dataSource.retrievalDate = moment();
        this.editMode = true;
        this.createMode = true;
    }
}
