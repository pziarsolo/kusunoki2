
export const siteConfig = {
  pathToStaticPages: '',
  defaultDataSource: { 'code': 'CRF', kind: 'project' },
  defaultAccessionSetInstitute: 'ESP004',
  useAccessionset: true,
  centralColumnSize: '1200px',
  version: require('../../package.json').version,
  useGoogleMaps: false,
  googleMapsApiKey: undefined,
  canRemoveAccessionset: true
};

export default siteConfig;
