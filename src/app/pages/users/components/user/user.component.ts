import { Component, Input, ViewChild } from '@angular/core';
import { User } from '../../../../shared/entities/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserChangePasswordDialogComponent } from '../user-change-password-dialog/user-change-password-dialog.component';
import { Validators } from '@angular/forms';
import { GroupListComponent } from '../group-list/group-list.component';
import { UserService } from 'src/app/shared/services/user.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { PasswordFormComponent } from 'src/app/shared/components/password-form/password-form.component';
import { BaseInlinesFormComponent } from 'src/app/shared/components/base-inlines-form/base-inlines-form.component';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'kusunoki2-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseInlinesFormComponent {
    userCanEdit: Boolean = false;
    userCanRemove: Boolean = false;

    @Input() input_form_data: User;
    @Input() username: string;

    @ViewChild(PasswordFormComponent) passwordForm;
    @ViewChild(GroupListComponent) groupsComponent;

    children_config = {
        username: {name: 'username', is_editable: false, is_required: true},
        email: {name: 'email', is_editable: true, is_required: true,
                validators: [Validators.email]},
        first_name: {name: 'first_name', is_editable: true, is_required: false},
        last_name: {name: 'last_name', is_editable: true, is_required: false},
    };

    constructor(private userService: UserService,
                public dialog: MatDialog,
                private router: Router,
                private readonly statusService: StatusService,
                private readonly currentUserService: CurrentUserService) {
        super();
    }
    afterInit() {
        const userToken = this.currentUserService.currentUserSubject.value;
        if (userToken) {
            if (userToken.is_staff) {
                this.userCanEdit = true;
                this.userCanRemove = true;
            } else if (this.username && userToken.username === this.username) {
                this.userCanEdit = true;
            }
        }
        if (this.create_mode) {
            this.input_form_data.groups = [];

        }
    }
    afterAfterViewChecked() {
        if (this.create_mode) {
            this.groupsComponent.edit_mode = true;
        }
    }
    getModelFromFormValidData() {
        const valid_data = this._getFormDataIfValid();
        const user = new User();
        user.username = valid_data['username'];
        user.email = valid_data['email'];
        user.first_name = valid_data['first_name'];
        user.last_name = valid_data['last_name'];
        return user;
    }

    checkGroupDifferences(initialGroups, updatedGroups) {
        const toRemove = initialGroups.filter(item => updatedGroups.indexOf(item) < 0);
        const toAdd = updatedGroups.filter(item => initialGroups.indexOf(item) < 0);
        return {'toRemove': toRemove, 'toAdd': toAdd};
    }
    doUpdate() {
        const updatedUser = this.getModelFromFormValidData();
        const groups = this.groupsComponent.groups;
        this.userService.update(this.input_form_data.username, updatedUser)
            .subscribe(user => {
                this.input_form_data = user;
                this.edit_mode = false;
                const groupDifs = this.checkGroupDifferences(this.input_form_data.groups,
                                                             groups);
                for (const g of groupDifs['toAdd']) {
                    this.userService.addToGroup(this.input_form_data.username, g)
                        .subscribe();
                }
                for (const g of groupDifs['toRemove']) {
                    this.userService.removeFromGroup(this.input_form_data.username, g)
                        .subscribe();
                }
                this.input_form_data.groups = groups;
            });
    }
    doRemove() {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '400px',
            data: {type: 'User',
                   description: `User: ${this.input_form_data['username']}`}
        });

        dialogRef.afterClosed().subscribe(doDeleteAccession => {
            if (doDeleteAccession) {
                this.userService.delete(this.input_form_data.username)
                    .subscribe(response => {
                        this.router.navigate([this.appUrls.users]);
                    });
            }
        });
    }
    doChangePassword() {
        const dialogRef = this.dialog.open(UserChangePasswordDialogComponent, {
            width: '400px',
            data: {type: 'User',
                   description: `User: ${this.input_form_data['username']}`}
        });

        dialogRef.afterClosed().subscribe(password => {
            if (password) {
                this.userService.changePassword(this.input_form_data.username,
                                                password )
                    .subscribe(response => {
                        this.statusService.success('password changed succesfully');
                    });
            }
        });
    }
    doCreate() {
        const newUser = this.getModelFromFormValidData();
        newUser.password = this.passwordForm.getFormDataIfValid();
        const groups = this.groupsComponent.groups;
        this.userService.create(newUser)
            .subscribe(user => {
                this.statusService.success('User succesfully created');
                for (const g of groups) {
                    this.userService.addToGroup(newUser.username, g)
                        .subscribe();
                }
                this.router.navigate(['/', this.appUrls.users, newUser.username]);
            });
    }
    formReset() {
        if (this.create_mode) {
            this.router.navigate(['/', this.appUrls.users]);
        }
        super.formReset();
        this.groupsComponent.formReset();
        this.create_mode = false;
        this.groupsComponent.edit_mode = false;
    }
    turnToeditMode() {
        this.edit_mode = true;
        const userToken = this.currentUserService.currentUserSubject.value;
        this.groupsComponent.edit_mode = userToken.is_staff;
    }
}

