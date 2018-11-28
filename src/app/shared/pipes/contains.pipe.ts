import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'contains'})
export class ContainsPipe implements PipeTransform {
    transform(value: string[], item: string): boolean {
        return value.indexOf(item) > -1;
    }
}
