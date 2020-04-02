
export const siteConfig = {
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
};

export default siteConfig;
