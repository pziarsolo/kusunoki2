import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { SeedRequest } from 'src/app/pages/seed-requests/entities/seed_request.model';
import { SeedRequestService } from 'src/app/pages/seed-requests/services/seed-request.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'kusunoki2-seed-petition-detail',
  templateUrl: './seed-request-detail.component.html',
  styleUrls: ['./seed-request-detail.component.scss']
})
export class SeedRequestDetailComponent implements OnInit {
    appConfig: AppConfig;
    request: SeedRequest;
    request_uid: string;
    routerSubscription: Subscription;
    editMode = false;

    constructor(private appConfigService: AppConfigService,
        private seedRequestService: SeedRequestService,
        private route: ActivatedRoute,
        private titleService: Title) {
        this.appConfig = this.appConfigService.getConfig();
    }

    ngOnInit(): void {
        this.routerSubscription = this.route.params.subscribe(params => {
            this.request_uid = params.request_uid;
            this.titleService.setTitle('Request ' + this.request_uid);
            this.seedRequestService.retrieve(this.request_uid)
                .subscribe((request: SeedRequest) => {
                    this.request = request;

                });
        });
    }

}
