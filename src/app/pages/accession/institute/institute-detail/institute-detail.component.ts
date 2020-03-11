import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {of as observableOf,  Observable, Subscription, pipe} from 'rxjs';

import { Institute } from 'src/app/shared/entities/institute.model';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { Country } from 'src/app/shared/entities/country.model';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { InstituteComponent } from '../institute/institute.component';
import { AppUrls } from 'src/app/pages/appUrls';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';


@Component({
  selector: 'kusunoki2-institute-detail',
  templateUrl: './institute-detail.component.html',
  styleUrls: ['./institute-detail.component.scss']
})
export class InstituteDetailComponent implements OnInit, OnDestroy {
    instituteCode: string;
    editMode = false;
    createMode = false;
    userCanEdit: boolean;
    countryFields = ['code', 'name', 'num_accessions', 'num_accessionsets'];
    instituteFound = true;
    country_stats: Observable<Country[]>;
    taxon_stats: Observable<any>;
    pdcis: Observable<any>;
    appConfig: AppConfig;

    @ViewChild(InstituteComponent) instituteComp;
    pdciCharConfig = {
        headers: [['', 'Num. Passports']],
        title: 'Pdci Distribution',
        ticks: [0, 1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10],
        htitle: 'pdci',
        vtitle: 'Num passports'};

    routerSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private instituteService: InstituteService,
                private currentUserService: CurrentUserService,
                private router: Router,
                private titleService: Title,
                private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
    }

    ngOnInit() {
        if (!this.appConfig.useAccessionset) {
            this.countryFields = ['code', 'name', 'num_accessions'];
        }
        this.routerSubscription = this.route.params.subscribe(params => {
            if (params.instituteCode === 'create') {
                this.titleService.setTitle('Create institute');
                this.createMode = true;
                this.editMode = true;
                this.instituteCode = undefined;
            } else {

                this.instituteCode = params.instituteCode;
                this.titleService.setTitle('Institute ' + this.instituteCode);
                this.createMode = false;
                this.editMode = false;
                this.getStats();
            }
        });
        const userToken = this.currentUserService.currentUserSubject.value;
        this.userCanEdit = userToken.is_staff ? true : false;


    }
    getStats() {
        this.pdcis = this.instituteService.retrieve(this.instituteCode, {fields: 'pdcis'})
            .pipe(
                map((response: Institute) => response.pdcis)
            );

        this.country_stats = this.instituteService.retrieve(
            this.instituteCode, {fields: 'stats_by_country'})
                .pipe(
                    map((response: Institute) => response.stats_by_country)
                );

        this.taxon_stats = this.instituteService.retrieve(
            this.instituteCode, {fields: 'stats_by_taxa'})
                .pipe(
                    map((response: Institute) => response.stats_by_taxa)
                );
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
    deleteInstitute() {
        this.instituteComp.deleteInstitute();
    }
    instituteDeleted() {
        this.router.navigate(['/', AppUrls.institutes]);
    }
    instituteCreated(institute) {
        this.router.navigate(['/', AppUrls.institutes, institute.instituteCode]);
    }
    instituteUpdated(institute) {
        this.editMode = false;
    }
    editCanceled() {
        if (this.createMode) {
            this.router.navigate([ AppUrls.institutes]);
        } else {
            this.instituteComp.resetForm();
            this.editMode = false;
            this.createMode = false;
        }
    }
    afterRequest(institute) {
        if (institute === undefined) {
            this.instituteFound = false;
        }
    }
}
