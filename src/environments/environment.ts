// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import siteConfig from '../site_assets/crf/config/crf_config';

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api/',
    config: siteConfig
};
