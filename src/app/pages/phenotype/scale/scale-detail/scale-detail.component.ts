import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { AppUrls } from 'src/app/pages/appUrls';
import { ScaleComponent } from '../scale/scale.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'kusunoki2-scale-detail',
  templateUrl: './scale-detail.component.html',
  styleUrls: ['./scale-detail.component.scss']
})
export class ScaleDetailComponent implements OnInit, OnDestroy {
    name: string;
    editMode = false;
    createMode = false;
    routerSubscription: Subscription;
    userCanEdit: boolean;
    scaleInDatabase = true;
    @ViewChild(ScaleComponent, {static: false}) scale;

    constructor(
        private route: ActivatedRoute,
        private currentUserService: CurrentUserService,
        private router: Router,
        private titleService: Title) { }

    ngOnInit(): void {
        this.routerSubscription = this.route.params.subscribe(params => {
            this.evalUserPermissions();
            if (params.name === 'create') {
                this.titleService.setTitle('Create scale');
                this.createMode = true;
                this.editMode = true;
                this.name = undefined;
            } else {
                this.name = params.name;
                this.titleService.setTitle('Scale ' + this.name);
            }
        });
    }
    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
    evalUserPermissions() {
        if (this.userCanEdit === undefined) {
            const userToken = this.currentUserService.currentUserSubject.value;

            if (userToken.is_staff) {
                this.userCanEdit = true;
            } else {
                this.userCanEdit = false;
            }
        }
    }
    scaleCreated(scale) {
        this.router.navigate(['/', AppUrls.phenotypeSubDir,
                              AppUrls.phenotype.scales,
                              scale.name]);
        this.editMode = false;
        this.createMode = false;
    }
    scaleDeleted($event) {
        this.router.navigate(['/', AppUrls.phenotypeSubDir,
                              AppUrls.phenotype.scales]);
    }
    cancelChange() {
        if (this.createMode) {
            this.router.navigate([
                AppUrls.phenotypeSubDir,
                AppUrls.phenotype.scales]);
        } else {
            this.editMode = false;
            this.scale.resetForm();

        }
    }
}
