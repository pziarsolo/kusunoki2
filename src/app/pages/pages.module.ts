import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutModule } from './base-layout-components/base-layout.module';
import { BaseLayoutComponent } from './base-layout-components/base-layout/base-layout.component';
import { LoginComponent } from './login/components/login/login.component';
import { LoginModule } from './login/login.module';
import { AppUrls } from './appUrls';
import { NotFoundComponent } from '../shared/components/not-found-component';
import { HomeComponent } from '../shared/components/home-component';

const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children : [

            {
                path: AppUrls.login,
                component: LoginComponent
                // loadChildren: '../kusunoki/login/login.module#LoginModule'
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UserModule',
                // canActivate: [IsAuthGuard]
            },
            {
                path: 'tasks',
                loadChildren: './tasks/tasks.module#TaskModule',
                // canActivate: [IsAuthGuard]
            },
            {
                path: AppUrls.phenotypeSubDir,
                loadChildren: './phenotype/phenotype.module#PhenotypeModule',
                // canActivate: [IsAuthGuard]
            },
            {
                path: '',
                loadChildren: './accession/accession.module#AccessionModule',
                // canActivate: [IsAuthGuard]
            },
            {
                path: '',
                component: HomeComponent
            },
            {
                path: '**',
                component: NotFoundComponent
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
