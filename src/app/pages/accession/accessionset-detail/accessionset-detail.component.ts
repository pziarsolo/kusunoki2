import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccessionSetService } from '../../../shared/services/accessionset.service';
import { AccessionSet } from 'src/app/shared/entities/accessionset.model';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';


@Component({
  selector: 'kusunoki2-accessionset-detail',
  templateUrl: './accessionset-detail.component.html',
  styleUrls: ['./accessionset-detail.component.css'],
})
export class AccessionSetDetailComponent implements OnInit {
    accessionsetNumber: string;
    accessionset: AccessionSet;
    appConfig: AppConfig;

    constructor(private accessionsetService: AccessionSetService,
        private readonly appconfigService: AppConfigService,
                private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.accessionsetNumber = params.accessionsetNumber;
        });
        this.appConfig = this.appconfigService.appConfig;
    }

    ngOnInit(): void {
        this.accessionsetService.retrieve(this.appConfig.defaultAccessionSetInstitute,
                                          this.accessionsetNumber)
            .subscribe(accessionset => this.accessionset = accessionset);
    }
}
