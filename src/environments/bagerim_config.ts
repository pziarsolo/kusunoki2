
export const siteConfig = {
    pathToStaticPages: '/bagerim',
    defaultDataSource: { 'code': 'ESP133', kind: 'Governamental' },
    defaultAccessionSetInstitute: 'ESP133',
    useAccessionset: false,
    centralColumnSize: '1200px',
    version: require('../../package.json').version,
    useGoogleMaps: false,
    googleMapsApiKey: ''
};

export default siteConfig;
