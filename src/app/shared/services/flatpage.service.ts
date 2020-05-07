import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../entities/app-config.model';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class FlatPageService {
    appConfig: AppConfig;
    language: string;
    constructor(private http: HttpClient,
                private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
        this.language = this.appConfig.currentLanguage;
    }

    get(path) {
        const url = `assets/pages/${path}.${this.language}.json`;
        return this.http.get(url);
    }
}
