import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutModule } from './base-layout-components/base-layout.module';
import { BaseLayoutComponent } from './base-layout-components/base-layout/base-layout.component';
import { LoginComponent } from './login/components/login/login.component';
import { LoginModule } from './login/login.module';
import { AppUrls } from './appUrls';
import { FlatpagesComponent } from '../shared/components/flatpages/flatpages.component';



const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children : [

            {
                path: AppUrls.login,
                component: LoginComponent,
                // loadChildren: '../kusunoki/login/login.module#LoginModule',
                data: {title: 'Login'}
            },
            {
                path: AppUrls.users,
                loadChildren: () => import('./users/users.module').then(m => m.UserModule),
                // canActivate: [IsAuthGuard]
                data: {title: 'Users'}
            },
            {
                path: AppUrls.tasks,
                loadChildren: () => import('./tasks/tasks.module').then(m => m.TaskModule),
                // canActivate: [IsAuthGuard]
                data: {title: 'Tasks'}
            },
            {
                path: AppUrls.seed_requests,
                loadChildren: () => import('./seed-requests/seed-requests.module').then(m => m.SeedRequestModule),
                // canActivate: [IsAuthGuard]
                data: { title: 'Seed Requests' }
            },
            {
                path: AppUrls.phenotypeSubDir,
                loadChildren: () => import('./phenotype/phenotype.module').then(m => m.PhenotypeModule),
                // canActivate: [IsAuthGuard]
            },
            {
                path: '',
                component: FlatpagesComponent,
                data: {path: '/home'}
            },
            {
                path: '',
                loadChildren: () => import('./accession/accession.module').then(m => m.AccessionModule),
                // canActivate: [IsAuthGuard]
            },

            {
                path: '**',
                component: FlatpagesComponent,
                data: {title: 'Not Found'}
            },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        BaseLayoutModule,
        LoginModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        SharedModule
    ]
})
export class PagesModule { }
