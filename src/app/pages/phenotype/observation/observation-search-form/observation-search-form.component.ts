import { Component, Output, EventEmitter } from '@angular/core';
import { ObservationSearchParams } from 'src/app/shared/entities/search-params.model';

@Component({
  selector: 'kusunoki2-observation-search-form',
  templateUrl: './observation-search-form.component.html',
  styleUrls: ['./observation-search-form.component.scss']
})
export class ObservationSearchFormComponent {
    @Output() searchSubmitted = new EventEmitter<any>();
    searchParams: ObservationSearchParams =  {};

    doSubmit() {
        this.searchSubmitted.emit(this.searchParams);
        this.searchParams = {};
    }

}
