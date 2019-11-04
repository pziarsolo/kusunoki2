import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../entities/app-config.model';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class FlatPageService {
    appConfig: AppConfig;
    constructor(private http: HttpClient,
        private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
    }
    get(path) {
        const url = 'assets/pages/' + this.appConfig.pathToStaticPages + path + '.json';
        return this.http.get(url);
    }
}
