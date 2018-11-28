import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'hasownproperty'})
export class HasOwnPropertyPipe implements PipeTransform {
    transform(value: object, item: any): boolean {
        return value.hasOwnProperty(item);
    }
}
