import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kusunoki2-study-search-form',
  templateUrl: './study-search-form.component.html',
  styleUrls: ['./study-search-form.component.scss']
})
export class StudySearchFormComponent {
    @Output() searchSubmitted = new EventEmitter<any>();
    searchParams = {};

    doSubmit() {
        this.searchSubmitted.emit(this.searchParams);
        this.searchParams = {};
    }
}
