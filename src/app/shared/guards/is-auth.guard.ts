import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AppUrls } from '../../pages/appUrls';
import { CurrentUserService } from '../services/current-user.service';
import { StatusService } from '../StatusModule/status.service';

@Injectable({
    providedIn: 'root',
})
export class IsAuthGuard implements CanActivate {
    constructor(private currentUserService: CurrentUserService,
                private router: Router,
                private status_service: StatusService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            if (!this.currentUserService.currentUserSubject.value.isAuthenticated) {
                this.status_service.warn('Not authorized');
                this.router.navigate(['/', AppUrls.login], {
                    queryParams: {
                        returnUrl: state.url
                    }
                });
                return false;
            }
        return true;
  }
}
