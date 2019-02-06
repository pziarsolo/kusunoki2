import { Metadata } from './metadata.model';

export class AccessionSet {
    data: AccessionSetData;
    metadata: Metadata;

    constructor(object?: AccessionSet) {
        if (object) {
            this.data = new AccessionSetData(object.data);
            this.metadata = new Metadata(object.metadata);
        } else {
            this.data = new AccessionSetData();
            this.metadata = new Metadata();
        }
    }
    getApiDocument() {
        return {'data': this.data.getApiDocument(),
                'metadata': this.metadata.getApiDocument()};
    }
}


export class AccessionIds {
    instituteCode: string;
    germplasmNumber: string;

    constructor(object?) {
        if (object) {
            this.instituteCode = object.instituteCode;
            this.germplasmNumber = object.germplasmNumber;
        } else {
            this.instituteCode = undefined;
            this.germplasmNumber = undefined;
        }
    }
    getApiDocument() {
        let apiDoc = {};
        if (this.germplasmNumber) {
            apiDoc['germplasmNumber'] = this.germplasmNumber;
        }
        if (this.instituteCode) {
            apiDoc['instituteCode'] = this.instituteCode;
        }
        if (Object.keys(apiDoc).length === 0) {
            apiDoc = undefined;
        }
        return apiDoc;
    }
}

export class AccessionSetData {
    instituteCode: string;
    accessionsetNumber: string;
    accessions: AccessionIds[];

    constructor(object?: AccessionSetData) {
        if (object) {
            this.instituteCode = object.instituteCode;
            this.accessionsetNumber = object.accessionsetNumber;
            if (object.accessions) {
                this.accessions = object.accessions.map(item => new AccessionIds(item));
            }
        } else {
            this.instituteCode = undefined;
            this.accessionsetNumber =  undefined;
            this.accessions = [];
        }
    }
    getApiDocument() {
        let apiDoc = {};
        if (this.accessionsetNumber) {
            apiDoc['accessionsetNumber'] = this.accessionsetNumber;
        }
        if (this.instituteCode) {
            apiDoc['instituteCode'] = this.instituteCode;
        }
        if (this.accessions.length > 0) {
            let accs = this.accessions.map(item => item.getApiDocument());
            accs = accs.filter(item => item !== undefined);
            if (accs.length > 0) {
                apiDoc['accessions'] = accs;
            }
        }
        if (Object.keys(apiDoc).length === 0) {
            apiDoc = undefined;
        }
        return apiDoc;
    }
}
