export class Metadata {
    is_public: boolean;
    group: string;

    constructor(object?: Metadata) {
        if (object) {
            this.is_public = object.is_public;
            this.group = object.group;
        } else {
            this.is_public = undefined;
            this.group = undefined;
        }
    }
    getApiDocument() {
        const apiDoc = {};
        if (this.is_public !== undefined) {
            apiDoc['is_public'] = this.is_public;
        }
        if (this.group) {
            apiDoc['group'] = this.group;
        }
        return apiDoc;
    }
}
