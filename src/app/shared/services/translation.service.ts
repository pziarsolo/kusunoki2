import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class TranslationSet {
    public languange: String;
    public values: { [key: string]: string } = {};
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    public language = environment.language;
    private dictionary = {};

    loadTranslation(language) {
        const urlToLanguageFile = `assets/translations/${language}.json`;

        this.http.get(urlToLanguageFile)
            .subscribe(response => {
                this.dictionary = response;
            });
    }
    constructor(private http: HttpClient) {
        if (this.language === 'en') {
            this.dictionary = {};
        } else {
            this.loadTranslation(this.language);
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
