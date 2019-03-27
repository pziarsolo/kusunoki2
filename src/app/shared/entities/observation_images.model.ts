import { Moment } from 'moment';
import * as moment from 'moment';
import { AccessionId } from './accession.model';

export class ObservationImage {
    observation_image_uid: string;
    observation_unit: string;
    creation_time: Moment;
    study: string;
    accession: AccessionId;
    image: string;
    image_medium: string;
    image_small: string;

    constructor(object?: ObservationImage) {
        if (object) {
            this.observation_image_uid = object.observation_image_uid;
            this.observation_unit = object.observation_unit;
            if (object.creation_time) {
                this.creation_time = moment(object.creation_time);
            } else {
                this.creation_time = undefined;
            }
            this.study = object.study;
            this.accession = new AccessionId(object.accession);
            this.image = object.image;
            this.image_medium = object.image_medium;
            this.image_small = object.image_small;

        } else {
            this.observation_image_uid = undefined;
            this.observation_unit = undefined;
            this.creation_time = undefined;
            this.study = undefined;
            this.accession = undefined;
            this.image = undefined;
            this.image_medium = undefined;
            this.image_small = undefined;
        }
    }

    getApiDocument() {
        const apiDoc = {};
        if (this.observation_image_uid) {
            apiDoc['observation_image_uid'] = this.observation_image_uid;
        }
        if (this.observation_unit) {
            apiDoc['observation_unit'] = this.observation_unit;
        }
        if (this.creation_time) {
            apiDoc['creation_time'] = this.creation_time.format();
        }
        if (this.study) {
            apiDoc['study'] = this.study;
        }
        if (this.accession) {
            apiDoc['accession'] = this.accession.getApiDocument();
        }
        if (this.image) {
            apiDoc['image'] = this.image;
        }
        if (this.image_medium) {
            apiDoc['image_medium'] = this.image_medium;
        }
        if (this.image_small) {
            apiDoc['image_small'] = this.image_small;
        }
        return apiDoc;
    }
}
