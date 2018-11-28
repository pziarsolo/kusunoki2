import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'minus2space'})
export class Minus2SpacePipe implements PipeTransform {
    transform(value: string): string {
        return value.replace('_', ' ');
    }
}
