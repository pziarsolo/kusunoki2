import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { AppConfig } from '../entities/app-config.model';

export class TranslationSet {
    public languange: String;
    public values: { [key: string]: string } = {};
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    private dictionary = {};
    private appConfig: AppConfig;
    loadTranslation(language) {
        const urlToLanguageFile = `assets/translations/${language}.json`;

        this.http.get(urlToLanguageFile)
            .subscribe(response => {
                this.dictionary = response;
            });
    }
    constructor(
        private http: HttpClient,
        private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
        const language = this.appConfig.currentLanguage;
        if (language === 'en') {
            this.dictionary = {};
        } else {
            this.loadTranslation(language);
        }
     }

    translate(key: string): string {
        const translated = this.dictionary[key];
        if (translated === undefined) {
            if (Object.keys(this.dictionary).length > 0) {
                console.log(`Add **${key}** to translation file`);
            }
            return key;
        }
        return translated;

    }
}
