import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kusunoki2-observation-search-form',
  templateUrl: './observation-search-form.component.html',
  styleUrls: ['./observation-search-form.component.scss']
})
export class ObservationSearchFormComponent {
    @Output() searchSubmitted = new EventEmitter<any>();
    searchParams = {};

    doSubmit() {
        this.searchSubmitted.emit(this.searchParams);
        this.searchParams = {};
    }

}
