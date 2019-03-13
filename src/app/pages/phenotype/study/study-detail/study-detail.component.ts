import { Component, OnInit, OnDestroy, ViewChildren, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Study } from 'src/app/shared/entities/study.model';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { StudyComponent } from '../study/study.component';
import { AppUrls } from 'src/app/pages/appUrls';

@Component({
  selector: 'kusunoki2-study-detail',
  templateUrl: './study-detail.component.html',
  styleUrls: ['./study-detail.component.scss']
})
export class StudyDetailComponent implements OnInit, OnDestroy {
    name: string;
    editMode = false;
    createMode = false;
    routerSubscription: Subscription;
    studyFound = true;
    study: Study;
    userCanEdit: boolean;

    @ViewChild(StudyComponent) studyComp;

    constructor(private route: ActivatedRoute,
        private currentUserService: CurrentUserService,
        private router: Router) { }

    ngOnInit(): void {
        this.routerSubscription = this.route.params.subscribe(params => {
            if (params.name === 'create') {
                this.createMode = true;
                this.editMode = true;
                this.name = undefined;
            } else {
                this.name = params.name;
                this.createMode = false;
                this.editMode = false;
            }
        });
    }
    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

    evalUserPermissions(study) {
        console.log('aa');
        this.study = study;
        if (this.study) {
            this.studyFound = true;
        } else {
            this.studyFound = false;
        }
        if (this.study && this.userCanEdit === undefined) {
            const userToken = this.currentUserService.currentUserSubject.value;
            const group = this.study.metadata.group;
            const is_public = this.study.metadata.is_public;
            if (userToken.is_staff) {
                this.userCanEdit = true;
            } else if (userToken.groups && group in userToken.groups &&  !is_public) {
                this.userCanEdit = true;
            } else {
                this.userCanEdit = false;
            }
        }
    }
    tooglePublic() {
        this.studyComp.tooglePublic();
    }
    deleteStudy() {
        this.studyComp.deleteStudy();
    }
    studyDeleted() {
        this.router.navigate(['/', AppUrls.phenotypeSubDir,
            AppUrls.phenotype.studies]);
    }
    studyCreated(study) {
        this.router.navigate(['/', AppUrls.phenotypeSubDir,
            AppUrls.phenotype.studies, study.data.name]);
    }
    editCanceled() {
        this.editMode = false;
        this.createMode = false;
        if (this.createMode) {
            this.router.navigate([ AppUrls.phenotypeSubDir, AppUrls.phenotype.studies]);
        } else {
            this.studyComp.resetForm();
        }
    }
}
