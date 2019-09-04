
export const siteConfig = {
    pathToStaticPages: '/comav_genebank',
    defaultDataSource: {'code': 'ESP026', kind: 'genebank'},
    defaultAccessionSetInstitute: 'ESP026',
    useAccessionset: false,
    centralColumnSize: '1200px',
    version: require('../../package.json').version,
    useGoogleMaps: true
};

export default siteConfig;
