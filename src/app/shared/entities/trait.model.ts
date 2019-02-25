export class Trait {
    name: string;
    description: string;
    ontology: string;
    ontology_id: string;

    constructor(object?: Trait) {
        if (object) {
            this.name = object.name;
            this.description = object.description;
            this.ontology = object.ontology;
            this.ontology_id = object.ontology_id;
        } else {
            this.name = undefined;
            this.description = undefined;
            this.ontology = undefined;
            this.ontology_id = undefined;

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
        if (this.ontology) {
            apiDoc['ontology'] = this.ontology;
        }
        if (this.ontology_id) {
            apiDoc['ontology_id'] = this.ontology_id;
        }
        return apiDoc;
    }
}
