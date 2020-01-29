// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import siteConfig from './crf_config';

export const environment = {
    language: 'es',
    production: false,
    apiUrl: 'http://localhost:8000/api/',
    // apiUrl: 'https://vavilov.comav.upv.es/api/',
    config: siteConfig
};
