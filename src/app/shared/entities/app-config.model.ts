
// import { DataSource } from './passport-entities/data_source.model';

export class AppConfig {
    public hasPassports: Boolean = false;
    public hasAccessions: Boolean = false;
    public hasAccessionsets: Boolean = false;

    public defaultDataSource; // : DataSource;

    public defaultAccessionSetInstitute: string;
    public showAccessionHeader: boolean;
    public showAccessionSetHeader: boolean;
    public showDataSourceInHeader: boolean;

    constructor() {}

    loadConfig(config) {
        this.defaultDataSource = config.defaultDataSource;
        this.showAccessionHeader = config.showAccessionHeader;
        this.showAccessionSetHeader = config.showAccessionSetHeader;
        this.showDataSourceInHeader = config.showDataSourceInHeader;
        this.defaultAccessionSetInstitute = config.defaultAccessionSetInstitute;
    }
}
