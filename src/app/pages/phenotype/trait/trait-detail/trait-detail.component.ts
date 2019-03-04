import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUrls } from 'src/app/pages/appUrls';
import { ScaleComponent } from '../../scale/scale/scale.component';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { TraitComponent } from '../trait/trait.component';

@Component({
  selector: 'kusunoki2-trait-detail',
  templateUrl: './trait-detail.component.html',
  styleUrls: ['./trait-detail.component.scss']
})
export class TraitDetailComponent implements OnInit, OnDestroy {
    name: string;
    editMode = false;
    createMode = false;
    routerSubscription: Subscription;
    userCanEdit: boolean;
    traitFound = true;

    @ViewChild(TraitComponent) traitComponent;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private currentUserService: CurrentUserService) { }

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
    traitCreated(trait) {
        this.router.navigate(['/', AppUrls.phenotypeSubDir,
                              AppUrls.phenotype.traits,
                              trait.name]);
        this.editMode = false;
        this.createMode = false;
    }

    traitDeleted() {
        this.router.navigate(['/', AppUrls.phenotypeSubDir,
                              AppUrls.phenotype.traits]);
    }
    cancelChange() {
        if (this.createMode) {
            this.router.navigate([
                AppUrls.phenotypeSubDir,
                AppUrls.phenotype.scales]);
        } else {
            this.editMode = false;
            this.traitComponent.resetForm();

        }
    }
}
