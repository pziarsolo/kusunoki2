import { Component, ViewChild, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { environment } from '../../../../environments/environment';
import { Observable} from 'rxjs';
import { AppUrls } from '../../appUrls';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';


@Component({
    selector: 'kusunoki2-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit, OnChanges, OnDestroy {
    showAddMenu: Observable<Boolean>;
    apiUrl = environment.apiUrl;
    apiDocs = this.apiUrl + '/docs';

    appUrls = AppUrls;

    @Output() notifyMenuChange = new EventEmitter();
    @Input() sidenavOpened: Boolean;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    menuIcon: string;

    userToken;

    constructor(private currentUserService: CurrentUserService) {}
    ngOnInit(): void {
        this.userToken = this.currentUserService.userToken;
        // this.userSubscription = this.userToken
        //     .subscribe(user => {
        //         if ((this.appConfig.showAccessionHeader || this.appConfig.showAccessionSetHeader ||
        //             this.appConfig.showPassportHeader) &&  user.isAuthenticated) {
        //             this.showAddMenu = of(true);
        //         } else {
        //             this.showAddMenu = of(false);
        //         }
        //     });
    }

    toggleSidenav() {
        this.notifyMenuChange.emit();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('sidenavOpened' in changes) {
            if (changes['sidenavOpened']['currentValue']) {
                this.menuIcon = 'arrow_back';
            } else {
                this.menuIcon = 'menu';
            }
        }
    }

    ngOnDestroy(): void {
        // this.userSubscription.unsubscribe();
    }
}
