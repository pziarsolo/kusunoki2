
export const siteConfig = {
    pathToStaticPages: '/comav_genebank',
    defaultDataSource: {'code': 'ESP026', kind: 'genebank'},
    defaultAccessionSetInstitute: 'ESP026',
    languages: ['en', 'es'],
    useAccessionset: false,
    centralColumnSize: '1200px',
    version: require('../../package.json').version,
    useGoogleMaps: false,
    googleMapsApiKey: 'undefined'
};

export default siteConfig;
