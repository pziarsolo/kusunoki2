import { Metadata } from './metadata.model';
import { Moment } from 'moment';
import * as moment from 'moment';

export class SeedPetitionData {
    petition_id?: number;
    name: string;
    type: string;
    institution: string;
    address: string;
    city: string;
    postal_code: string;
    region: string;
    country: string;
    email: string;
    petition_date: Moment;
    aim: string;
    comments?: string;
    accessions: object[];

    constructor(object?: SeedPetitionData) {
        if (object) {
            if (object.petition_id) {
                this.petition_id = object.petition_id;
            }
            this.name = object.name;
            this.type = object.type;
            this.institution = object.institution;
            this.address = object.address;
            this.city = object.city;
            this.postal_code = object.postal_code;
            this.region = object.region;
            this.country = object.country;
            this.email = object.email;
            this.petition_date = moment(object.petition_date, 'YYYY/MM/DD');
            this.aim = object.aim;
            this.comments = object.comments;
            this.accessions = object.accessions;

        } else {
            this.petition_id = undefined;
            this.name = undefined;
            this.type = undefined;
            this.institution = undefined;
            this.address = undefined;
            this.city = undefined;
            this.postal_code = undefined;
            this.region = undefined;
            this.country = undefined;
            this.email = undefined;
            this.petition_date = undefined;
            this.aim = undefined;
            this.comments = undefined;
            this.accessions = [];
        }
    }

    getApiDocument() {
        const apiDoc = {};
        if (this.petition_id) {
            apiDoc['petition_id'] = this.petition_id;
        }
        if (this.name) {
            apiDoc['name'] = this.name;
        }
        if (this.type) {
            apiDoc['type'] = this.type;
        }
        if (this.institution) {
            apiDoc['institution'] = this.institution;
        }
        if (this.address) {
            apiDoc['address'] = this.address;
        }
        if (this.city) {
            apiDoc['city'] = this.city;
        }
        if (this.postal_code) {
            apiDoc['postal_code'] = this.postal_code;
        }
        if (this.region) {
            apiDoc['region'] = this.region;
        }
        if (this.country) {
            apiDoc['country'] = this.country;
        }
        if (this.email) {
            apiDoc['email'] = this.email;
        }
        if (this.petition_date) {
            apiDoc['petition_date'] = this.petition_date.format('YYYY/MM/DD');
        }
        if (this.aim) {
            apiDoc['aim'] = this.aim;
        }
        if (this.comments) {
            apiDoc['comments'] = this.comments;
        }
        if (this.accessions) {
            apiDoc['accessions'] = this.accessions;
        }
        return apiDoc;
    }
}


export class SeedPetition {
    data: SeedPetitionData;
    metadata: Metadata;
    constructor(object?: SeedPetition) {
        if (object) {
            this.data = new SeedPetitionData(object.data);
            this.metadata = new Metadata(object.metadata);
        } else {
            this.data = new SeedPetitionData();
            this.metadata = new Metadata();
        }
    }
    getApiDocument() {
        return {'data': this.data.getApiDocument(),
                'metadata': this.metadata.getApiDocument()};
    }
}
