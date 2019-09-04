
// import { DataSource } from './passport-entities/data_source.model';

export class AppConfig {
    public useAccessionset: Boolean = false;
    public defaultDataSource; // : DataSource;
    public defaultAccessionSetInstitute: string;
    public version: Number;
    public centralColumnSize: string;
    public useGoogleMaps: boolean;
    public pathToStaticPages: string;

    constructor() {}

    loadConfig(config) {
        this.defaultDataSource = config.defaultDataSource;
        this.defaultAccessionSetInstitute = config.defaultAccessionSetInstitute;
        this.useAccessionset = config.useAccessionset;
        this.version = config.version;
        this.centralColumnSize = config.centralColumnSize;
        if (config.useGoogleMaps !== undefined) {
            this.useGoogleMaps = config.useGoogleMaps;
        } else {
            this.useGoogleMaps = false;
        }
        if (config.pathToStaticPages === undefined) {
            this.pathToStaticPages = '';
        } else {
            this.pathToStaticPages = config.pathToStaticPages;
        }
    }
}
