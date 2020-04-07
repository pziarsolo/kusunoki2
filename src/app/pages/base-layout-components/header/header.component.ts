import { Component, ViewChild, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { environment } from '../../../../environments/environment';
import { Observable} from 'rxjs';
import { AppUrls } from '../../appUrls';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { Router } from '@angular/router';

@Component({
    selector: 'kusunoki2-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit, OnChanges, OnDestroy {
    showAddMenu: Observable<Boolean>;
    apiUrl = environment.apiUrl;
    apiDocs = this.apiUrl + 'doc';
    centralColumnSize: string;
    appUrls = AppUrls;
    appConfig: AppConfig;
    @Output() notifyMenuChange = new EventEmitter();
    @Input() sidenavOpened: Boolean;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    menuIcon: string;
    alternativeLanguages: string[];
    userToken;


    constructor(
        private currentUserService: CurrentUserService,
        private appConfigService: AppConfigService,
        private router: Router) {
            this.appConfig = this.appConfigService.getConfig();
            this.centralColumnSize = this.appConfig.centralColumnSize;
        }
    ngOnInit(): void {
        this.userToken = this.currentUserService.userToken;

        const languages = Object.assign([], this.appConfig.languages);
        const index = languages.indexOf(this.appConfig.currentLanguage);
        if (index !== -1) {
            languages.splice(index, 1);
        }
        if (languages.length > 0) {
            this.alternativeLanguages = languages;
        }

    }
    toggleSidenav() {
        this.notifyMenuChange.emit();
    }
    switchLanguage() {
        const url = this.router.url;
        window.open(`/${ this.alternativeLanguages[0]}${url}`, '_self');
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
