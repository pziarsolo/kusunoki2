import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserComponent } from './components/user/user.component';
import { UserChangePasswordDialogComponent } from './components/user-change-password-dialog/user-change-password-dialog.component';
import { FormsModule } from '@angular/forms';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { CreateGroupDialogComponent } from './components/create-group-dialog/create-group-dialog.component';
import { IsAdminGuard } from 'src/app/shared/guards/is-admin.guard';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        canActivate: [IsAdminGuard]
    },
    {
        path: 'create',
        component: UserCreateComponent,
        canActivate: [IsAdminGuard]
    },
    {
        path: ':username',
        component: UserDetailComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        UserListComponent,
        UserDetailComponent,
        UserComponent,
        UserChangePasswordDialogComponent,
        UserCreateComponent,
        GroupListComponent,
        CreateGroupDialogComponent
    ],
    entryComponents: [
        UserChangePasswordDialogComponent,
        CreateGroupDialogComponent
    ]
})
export class UserModule { }
