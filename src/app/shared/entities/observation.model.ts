import { Metadata } from './metadata.model';
import { Moment } from 'moment';
import * as moment from 'moment';
import { AccessionId } from './accession.model';

export class Observation {
    observation_id: number;
    observation_variable: string;
    observation_unit: string;
    value: string;
    creation_time: Moment;
    study: string;
    accession: AccessionId;

    constructor(object?: Observation) {
        if (object) {
            this.observation_id = object.observation_id;
            this.observation_variable = object.observation_variable;
            this.observation_unit = object.observation_unit;
            this.value = object.value;
            if (object.creation_time) {
                this.creation_time = moment(object.creation_time);
            } else {
                this.creation_time = undefined;
            }

            this.study = object.study;
            this.accession = new AccessionId(object.accession);
        } else {
            this.observation_id = undefined;
            this.observation_variable = undefined;
            this.observation_unit = undefined;
            this.value = undefined;
            this.creation_time = undefined;
            this.study = undefined;
            this.accession = undefined;
        }
    }

    getApiDocument() {
        const apiDoc = {};
        if (this.observation_id) {
            apiDoc['observation_id'] = this.observation_id;
        }
        if (this.observation_variable) {
            apiDoc['observation_variable'] = this.observation_variable;
        }
        if (this.observation_unit) {
            apiDoc['observation_unit'] = this.observation_unit;
        }
        if (this.creation_time) {
            apiDoc['creation_time'] = this.creation_time.format();
        }

        if (this.value) {
            apiDoc['value'] = this.value;
        }
        if (this.study) {
            apiDoc['study'] = this.study;
        }
        if (this.accession) {
            apiDoc['accession'] = this.accession.getApiDocument();
        }
        return apiDoc;
    }
}
