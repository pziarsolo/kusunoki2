
export class Scale {
    name: string;
    description: string;
    decimal_places: number;
    data_type: string;
    min: number;
    max: number;
    valid_values: string[];

    constructor(object?: Scale) {
        if (object) {
            this.name = object.name;
            this.description = object.description;
            this.decimal_places = object.decimal_places;
            this.data_type = object.data_type;
            this.min = object.min;
            this.max = object.max;
            this.valid_values = object.valid_values;
        } else {
            this.name = undefined;
            this.description = undefined;
            this.decimal_places = undefined;
            this.data_type = undefined;
            this.min = undefined;
            this.max = undefined;
            this.valid_values = [];
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
        if (this.decimal_places) {
            apiDoc['decimal_places'] = this.decimal_places;
        }
        if (this.data_type) {
            apiDoc['data_type'] = this.data_type;
        }

        if (this.max) {
            apiDoc['max'] = this.max;
        }
        if (this.min) {
            apiDoc['min'] = this.min;
        }
        if (this.valid_values) {
            apiDoc['valid_values'] = this.valid_values;
        }
        return apiDoc;
    }
}
