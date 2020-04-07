import { Metadata } from '../../../shared/entities/metadata.model';
import { Moment } from 'moment';
import * as moment from 'moment';

export class SeedRequestData {
    request_uid?: string;
    name: string;
    type: string;
    institution: string;
    address: string;
    city: string;
    postal_code: string;
    region: string;
    country: string;
    email: string;
    request_date: Moment;
    aim: string;
    comments?: string;
    accessions: object[];

    constructor(object?: SeedRequestData) {
        if (object) {
            if (object.request_uid) {
                this.request_uid = object.request_uid;
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
            this.request_date = moment(object.request_date, 'YYYY/MM/DD');
            this.aim = object.aim;
            this.comments = object.comments;
            this.accessions = object.accessions;

        } else {
            this.request_uid = undefined;
            this.name = undefined;
            this.type = undefined;
            this.institution = undefined;
            this.address = undefined;
            this.city = undefined;
            this.postal_code = undefined;
            this.region = undefined;
            this.country = undefined;
            this.email = undefined;
            this.request_date = undefined;
            this.aim = undefined;
            this.comments = undefined;
            this.accessions = [];
        }
    }

    getApiDocument() {
        const apiDoc = {};
        if (this.request_uid) {
            apiDoc['request_uid'] = this.request_uid;
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
        if (this.request_date) {
            apiDoc['request_date'] = this.request_date.format('YYYY/MM/DD');
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


export class SeedRequest {
    data: SeedRequestData;
    metadata: Metadata;
    constructor(object?: SeedRequest) {
        if (object) {
            this.data = new SeedRequestData(object.data);
            this.metadata = new Metadata(object.metadata);
        } else {
            this.data = new SeedRequestData();
            this.metadata = new Metadata();
        }
    }
    getApiDocument() {
        return {'data': this.data.getApiDocument(),
                'metadata': this.metadata.getApiDocument()};
    }
}
