import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'improveTaskName'})
export class ImproveTaskNamePipe implements PipeTransform {
    transform(value: string): string {
        const items = value.split('.');
        let name = items[items.length - 1];
        name = name.replace(/_/g, ' ');

        return name[0].toUpperCase() + name.slice(1);;
    }
}
