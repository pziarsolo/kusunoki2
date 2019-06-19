import site_config from './shared_config';

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api',
    config: {
        defaultDataSource: {'code': 'ESP026', kind: 'genebank'},
        defaultAccessionSetInstitute: 'ESP026',
        useAccessionset: false,
        centralColumnSize: '1200px',
        version: require('../../package.json').version
    }
};
