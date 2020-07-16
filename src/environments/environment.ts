// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const siteConfig = {
    title: 'Inventario Navional',
    pathToStaticPages: '/crf',
    defaultDataSource: { 'code': 'CRF', kind: 'project' },
    defaultAccessionSetInstitute: 'ESP004',
    useAccessionset: true,
    languages: ['en', 'es'],
    centralColumnSize: '1200px',
    version: require('../../package.json').version,
    useGoogleMaps: false,
    googleMapsApiKey: undefined,
    canRemoveAccessionset: true,
    useShoppingCart: true,
    reCaptchaKey: '6LcM6-8UAAAAAJL08eD5PLyLRb3mUts7IbB5kMp1',
    pubDbUrl: 'http://localhost:8000/publications/'
};
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api/',
    config: siteConfig,
    hasPubDb: true
};
