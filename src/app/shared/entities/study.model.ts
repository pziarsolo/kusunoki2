import { Metadata } from './metadata.model';
import { Moment } from 'moment';
import * as moment from 'moment';

export class StudyData {
    name: string;
    description: string;
    active: boolean;
    start_date: Moment;
    end_date: Moment;
    location: string;
    contacts: string;
    season: string;
    institution: string;

    constructor(object?: StudyData) {
        if (object) {
            this.name = object.name;
            this.description = object.description;
            this.active = object.active;
            if (object.start_date) {
                this.start_date = moment(object.start_date, 'YYYY/MM/DD');
            } else {
                this.start_date = undefined;
            }
            if (object.end_date) {
                this.end_date = moment(object.end_date, 'YYYY/MM/DD');
            } else {
                this.end_date = undefined;
            }
            this.location = object.location;
            this.contacts = object.contacts;
            this.institution = object.institution;
            this.season = object.season;
        } else {
            this.name = undefined;
            this.description = undefined;
            this.active = false;
            this.start_date = undefined;
            this.end_date = undefined;
            this.location = undefined;
            this.contacts = undefined;
            this.season = undefined;
            this.institution = undefined;
        }
    }

    getApiDocument() {
        const apiDoc = {};
        if (this.name) {
            apiDoc['name'] = this.name;
        }
        if (this.description) {
            apiDoc['description'] = this.description;
        }
        if (this.active !== undefined) {
            apiDoc['active'] = this.active;
        }
        if (this.start_date) {
            apiDoc['start_date'] = this.start_date.format('YYYY/MM/DD');
        }
        if (this.end_date) {
            apiDoc['end_date'] = this.end_date.format('YYYY/MM/DD');
        }
        if (this.location) {
            apiDoc['location'] = this.location;
        }
        if (this.contacts) {
            apiDoc['contacts'] = this.contacts;
        }
        if (this.season) {
            apiDoc['season'] = this.season;
        }
        if (this.institution) {
            apiDoc['institution'] = this.institution;
        }
        return apiDoc;
    }
}


export class Study {
    data: StudyData;
    metadata: Metadata;
    constructor(object?: Study) {
        if (object) {
            this.data = new StudyData(object.data);
            this.metadata = new Metadata(object.metadata);
        } else {
            this.data = new StudyData();
            this.metadata = new Metadata();
        }
    }
    getApiDocument() {
        return {'data': this.data.getApiDocument(),
                'metadata': this.metadata.getApiDocument()};
    }
}
