import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AppConfig } from '../entities/app-config.model';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    private appConfig: AppConfig;

    constructor(private http: HttpClient) {}

    loadAppConfig() {
        this.appConfig.loadConfig(environment.config);
    }

    getConfig() {
        return this.appConfig;
    }
}
