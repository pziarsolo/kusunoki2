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
    // apiUrl: 'https://vavilov.comav.upv.es/api/',
    config: siteConfig,
    hasPubDb: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
