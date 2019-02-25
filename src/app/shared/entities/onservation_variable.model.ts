import { Metadata } from './metadata.model';

export class ObservationVariableData {
    name: string;
    description: string;
    trait: string;
    method: string;
    scale: string;
    constructor(object?: ObservationVariableData) {
        if (object) {
            this.name = object.name;
            this.description = object.description;
            this.trait = object.trait;
            this.method = object.method;
            this.scale  = object.scale;
        } else {
            this.name = undefined;
            this.description = undefined;
            this.trait = undefined;
            this.method = undefined;
            this.scale  = undefined;
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
        if (this.trait) {
            apiDoc['trait'] = this.trait;
        }
        if (this.method) {
            apiDoc['method'] = this.method;
        }
        if (this.scale) {
            apiDoc['scale'] = this.scale;
        }
        return apiDoc;
    }
}


export class ObservationVariable {
    data: ObservationVariableData;
    metadata: Metadata;
    constructor(object?: ObservationVariable) {
        if (object) {
            this.data = new ObservationVariableData(object.data);
            this.metadata = new Metadata(object.metadata);
        } else {
            this.data = new ObservationVariableData();
            this.metadata = new Metadata();
        }
    }
    getApiDocument() {
        return {'data': this.data.getApiDocument(),
                'metadata': this.metadata.getApiDocument()};
    }
}
