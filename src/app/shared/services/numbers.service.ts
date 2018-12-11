import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin} from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessionSetService } from './accessionset.service';
import { AccessionService } from './accession.service';

@Injectable({
    providedIn: 'root'
})
export class NumbersService {
    constructor(private http: HttpClient,
                private accessionService: AccessionService,
                private accessionSetService: AccessionSetService) {}

    list(searchParams: object) {
        const val = searchParams['number__icontains'];
        const observableList = forkJoin(
            this.accessionService.list({germplasm_number__icontains: val,
                                        fields: 'germplasmNumber',
                                        limit: 20}),
            this.accessionSetService.list({accessionset_number__icontains: val,
                                           fields: 'accessionsetNumber',
                                           limit: 20})
        );
        return observableList.pipe(
            map(
                responses => {
                    let numbers = responses[0].body.map(item => item.data.germplasmNumber);
                    numbers = numbers.concat(responses[1].body.map(item => item.data.accessionsetNumber));
                    return numbers;
                }
            )
        );
    }
}
