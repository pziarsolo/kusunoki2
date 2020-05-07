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
    reCaptchaKey: '6LcM6-8UAAAAAJL08eD5PLyLRb3mUts7IbB5kMp1'
};

export const environment = {
    production: true,
    apiUrl: '/api/',
    config: siteConfig
};
