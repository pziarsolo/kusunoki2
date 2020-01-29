
export const siteConfig = {
    pathToStaticPages: '/comav_genebank',
    defaultDataSource: {'code': 'ESP026', kind: 'genebank'},
    defaultAccessionSetInstitute: 'ESP026',
    languages: ['en'],
    useAccessionset: false,
    centralColumnSize: '1200px',
    version: require('../../package.json').version,
    useGoogleMaps: true,
    googleMapsApiKey: 'AIzaSyBlw76orChFiR4RnGbMoNHMuF7t3g8MUgU'
};

export default siteConfig;
