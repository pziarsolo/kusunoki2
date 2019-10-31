
export const siteConfig = {
    pathToStaticPages: '/bagerim',
    defaultDataSource: { 'code': 'ESP026', kind: 'genebank' },
    defaultAccessionSetInstitute: 'ESP026',
    useAccessionset: false,
    centralColumnSize: '1200px',
    version: require('../../package.json').version,
    useGoogleMaps: false,
    googleMapsApiKey: ''
};

export default siteConfig;
