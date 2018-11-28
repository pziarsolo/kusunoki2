import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tostring'})
export class ToStringPipe implements PipeTransform {
    transform(value: any): string {
        return String(value);
    }
}
