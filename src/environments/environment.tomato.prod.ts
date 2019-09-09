
export const environment = {
    production: true,
    apiUrl: 'https://api.tomato.comav.upv.es/api/',
    config: {
        pathToStaticPages: '/tomato',
        defaultDataSource: {'code': 'ESP026', kind: 'genebank'},
        defaultAccessionSetInstitute: 'ESP026',
        useAccessionset: false,
        centralColumnSize: '1200px',
        version: require('../../package.json').version,
        useGoogleMaps: true
    }
};
