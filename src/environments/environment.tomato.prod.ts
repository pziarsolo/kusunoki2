
export const environment = {
    language: 'en',
    production: true,
    apiUrl: 'https://tomato.upv.es/api/',
    config: {
        pathToStaticPages: '/tomato',
        defaultDataSource: { 'code': 'ESP026', kind: 'genebank' },
        defaultAccessionSetInstitute: 'ESP026',
        useAccessionset: false,
        languages: ['en'],
        centralColumnSize: '1200px',
        version: require('../../package.json').version,
        useGoogleMaps: true,
        googleMapsApiKey: 'AIzaSyBlw76orChFiR4RnGbMoNHMuF7t3g8MUgU'
    }
};
