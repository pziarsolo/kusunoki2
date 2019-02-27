import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudySearchParams } from 'src/app/shared/entities/search-params.model';

@Component({
  selector: 'kusunoki2-study-search-form',
  templateUrl: './study-search-form.component.html',
  styleUrls: ['./study-search-form.component.scss']
})
export class StudySearchFormComponent {
    @Output() searchSubmitted = new EventEmitter<any>();
    searchParams: StudySearchParams = {};

    doSubmit() {
        this.searchSubmitted.emit(this.searchParams);
        this.searchParams = {};
    }
}
