import {StatusLevels} from './status-levels.enum';

export interface StatusInterface {
    message: string;
    level: StatusLevels;
    obj?: any;
    success?: boolean;
}


export class Status implements StatusInterface {
    message: string;
    level: StatusLevels;
    obj?: any;
    success?: boolean;

    constructor(object?: StatusInterface) {
        if (object) {
            this.message = object.message;
            this.level = object.level;
            if (object.obj) {
                this.obj = object.obj;
            }
            if (object.success) {
                this.success = object.success;
            }
        }
    }
}
