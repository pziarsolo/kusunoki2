import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class TranslationSet {
    public languange: String;
    public values: { [key: string]: string } = {};
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
    public languages = ['es', 'en'];
    public language = 'es';
    private dictionary = {};

    loadTranslation(languaje) {
        const urlToLanguageFile = `assets/translations/${languaje}.json`;

        this.http.get(urlToLanguageFile)
            .subscribe(response => {
                console.log(response);
                this.dictionary = response;
            });
    }
    constructor(private http: HttpClient) {
        this.loadTranslation(this.language);
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
