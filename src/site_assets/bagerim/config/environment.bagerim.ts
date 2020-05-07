
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api/',
    config: {
        title: 'Banco germoplasma IMIDA',
        pathToStaticPages: '/bagerim',
        defaultDataSource: { 'code': 'ESP133', kind: 'Governamental' },
        defaultAccessionSetInstitute: 'ESP133',
        useAccessionset: false,
        languages: ['en'],
        centralColumnSize: '1200px',
        version: require('../../package.json').version,
        useGoogleMaps: false,
        googleMapsApiKey: ''
    }
};
