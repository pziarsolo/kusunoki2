import { Pipe, PipeTransform } from '@angular/core';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Pipe({
  name: 'object2string'
})
export class Object2stringPipe implements PipeTransform {

  transform(value: object): String {
      const newValue = [];
      for (const entrie of Object.entries(value)) {
          newValue.push(`${entrie[0]}:${entrie[1]}`);
      }

    return newValue.join(';');
  }

}
