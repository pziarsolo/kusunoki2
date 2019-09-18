import { Pipe, PipeTransform } from '@angular/core';
import { conservation_statuses } from 'src/app/pages/accession/assets/conservationStatus';

@Pipe({ name: 'ShowDescriptiveConStatus' })
export class ShowDescriptiveConStatus implements PipeTransform {
    transform(value: string): string {
        const filtered = conservation_statuses.filter(item => item['code'] === value);
        return filtered.length > 0 ? filtered[0]['name'] : value;
    }
}
