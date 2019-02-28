import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservationVariableComponent } from '../observation-variable/observation-variable.component';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { AppUrls } from 'src/app/pages/appUrls';

@Component({
  selector: 'kusunoki2-observation-variable-detail',
  templateUrl: './observation-variable-detail.component.html',
  styleUrls: ['./observation-variable-detail.component.scss']
})
export class ObservationVariableDetailComponent implements OnInit, OnDestroy {
    name: string;
    createMode = false;
    editMode = false;
    routerSubscription: Subscription;

    userCanEdit: boolean;
    @ViewChild(ObservationVariableComponent) variableComponent;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private currentUserService: CurrentUserService) { }

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

    ngOnInit(): void {
        this.routerSubscription = this.route.params.subscribe(params => {
            this.evalUserPermissions();
            if (params.name === 'create') {
                this.createMode = true;
                this.editMode = true;
                this.name = undefined;
            } else {
                this.name = params.name;
            }
        });
    }
    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

    variableCreated(observation_variable) {
        this.router.navigate(['/', AppUrls.phenotypeSubDir,
                              AppUrls.phenotype.observation_variables,
                              observation_variable.data.name]);
        this.editMode = false;
        this.createMode = false;
    }

    variableDeleted() {
        this.router.navigate(['/', AppUrls.phenotypeSubDir,
                              AppUrls.phenotype.observation_variables]);
    }
    cancelChange() {
        if (this.createMode) {
            this.router.navigate([
                AppUrls.phenotypeSubDir,
                AppUrls.phenotype.observation_variables]);
        } else {
            this.editMode = false;
            this.variableComponent.resetForm();

        }
    }
}