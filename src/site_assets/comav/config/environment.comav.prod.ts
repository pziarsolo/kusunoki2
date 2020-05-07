
export const environment = {
    production: true,
    apiUrl: '/api/',
    config: {
        title: 'Banco germoplasma UPV-COMAV',
        pathToStaticPages: '/comav_genebank',
        defaultDataSource: { 'code': 'ESP026', kind: 'genebank' },
        defaultAccessionSetInstitute: 'ESP026',
        languages: ['en', 'es'],
        useAccessionset: false,
        centralColumnSize: '1200px',
        version: require('../../package.json').version,
        useGoogleMaps: false,
        googleMapsApiKey: undefined
    }
};
