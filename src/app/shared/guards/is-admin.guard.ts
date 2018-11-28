import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { CurrentUserService } from '../services/current-user.service';
import { StatusService } from '../StatusModule/status.service';

@Injectable({
    providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
    constructor(private currentUserService: CurrentUserService,
                private location: Location,
                private router: Router,
                private status_service: StatusService) {
        this._userIsAllowed();
                }
    userIsAllowed: boolean;
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            if (!this.userIsAllowed) {
                this.status_service.warn('Not Allowed to see this page');
                this.router.navigate(['/']);
                return false;
            } else {
                return true;
            }
        }

    private _userIsAllowed() {
        this.currentUserService.userToken
            .subscribe(user => this.userIsAllowed = user.is_staff);
    }
}
