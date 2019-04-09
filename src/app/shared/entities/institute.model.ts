export class Institute {
    instituteCode: string;
    name?: string;
    type: string;
    address: string;
    zipcode: string;
    email: string;
    phone: string;
    city: string;
    url: string;
    manager: string;
    stats_by_taxa?: any;
    stats_by_country?: any;
    num_passports?: number;
    num_accessions?: number;
    num_accessionsets?: number;
    pdcis?: number[];

    constructor(object?: Institute) {
        if (object) {
            this.instituteCode = object.instituteCode;
            this.name = object.name;
            this.type = object.type;
            this.address = object.address;
            this.zipcode = object.zipcode;
            this.email = object.email;
            this.phone = object.phone;
            this.city = object.city;
            this.url = object.url;
            this.manager = object.manager;
        } else {
            this.instituteCode = undefined;
            this.name = undefined;
            this.type = undefined;
            this.address = undefined;
            this.zipcode = undefined;
            this.email = undefined;
            this.phone = undefined;
            this.city = undefined;
            this.url = undefined;
            this.manager = undefined;
        }
    }
    getApiDocument() {
        const apiDoc = {};
        if (this.instituteCode) {
            apiDoc['instituteCode'] = this.instituteCode;
        }
        if (this.name) {
            apiDoc['name'] = this.name;
        }
        if (this.type) {
            apiDoc['type'] = this.type;
        }
        if (this.address) {
            apiDoc['address'] = this.address;
        }
        if (this.zipcode) {
            apiDoc['zipcode'] = this.zipcode;
        }
        if (this.email) {
            apiDoc['email'] = this.email;
        }
        if (this.phone) {
            apiDoc['phone'] = this.phone;
        }
        if (this.city) {
            apiDoc['city'] = this.city;
        }
        if (this.url) {
            apiDoc['url'] = this.url;
        }
        if (this.manager) {
            apiDoc['manager'] = this.manager;
        }
        return apiDoc;
    }

}
