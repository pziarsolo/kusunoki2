import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Pipe({ name: 'momentsMCPD' })
export class MomentsMCPDPipe implements PipeTransform {
    transform(value?: Moment): string {
        if (value !== undefined && value !== null) {
            return value.format('YYYYMMDD');
        }
    }
}
