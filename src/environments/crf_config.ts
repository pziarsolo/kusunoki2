
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
    reCaptchaKey: '6LfAwecUAAAAAOhcNoiaI7fH_vVbcSe_YlC_ia71'
};

export default siteConfig;
