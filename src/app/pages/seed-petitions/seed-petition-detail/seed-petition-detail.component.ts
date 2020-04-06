import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { SeedPetition } from 'src/app/shared/entities/seed_petition.model';
import { SeedPetitionService } from 'src/app/shared/services/seed-petition.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'kusunoki2-seed-petition-detail',
  templateUrl: './seed-petition-detail.component.html',
  styleUrls: ['./seed-petition-detail.component.scss']
})
export class SeedPetitionDetailComponent implements OnInit {
    appConfig: AppConfig;
    petition: SeedPetition;
    petition_uid: string;
    routerSubscription: Subscription;
    editMode = false;

    constructor(private appConfigService: AppConfigService,
        private seedPetitionService: SeedPetitionService,
        private route: ActivatedRoute,
        private titleService: Title) {
        this.appConfig = this.appConfigService.getConfig();
    }

    ngOnInit(): void {
        this.routerSubscription = this.route.params.subscribe(params => {
            this.petition_uid = params.petition_uid;
            this.titleService.setTitle('Petition Uid ' + this.petition_uid);
            this.seedPetitionService.retrieve(this.petition_uid)
                .subscribe((petition: SeedPetition) => {
                    this.petition = petition;

                });
        });
    }

}
