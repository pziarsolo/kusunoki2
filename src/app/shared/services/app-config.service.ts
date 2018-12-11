import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppConfig } from '../entities/app-config.model';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    appConfig: AppConfig;

    constructor() {
        this.appConfig = new AppConfig();
        this.appConfig.loadConfig(environment.config);
    }

    getConfig() {
        return this.appConfig;
    }
}
