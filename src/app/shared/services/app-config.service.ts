import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppConfig } from '../entities/app-config.model';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    appConfig: AppConfig;

    constructor(@Inject(LOCALE_ID) protected localeId: string) {
        this.appConfig = new AppConfig();
        this.appConfig.loadConfig(environment.config);
        this.appConfig.currentLanguage = localeId;
    }

    getConfig() {
        return this.appConfig;
    }
}
