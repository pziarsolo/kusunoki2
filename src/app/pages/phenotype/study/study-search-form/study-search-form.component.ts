import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudySearchParams } from 'src/app/shared/entities/search-params.model';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';

@Component({
  selector: 'kusunoki2-study-search-form',
  templateUrl: './study-search-form.component.html',
  styleUrls: ['./study-search-form.component.scss']
})
export class StudySearchFormComponent implements OnInit {
    @Output() searchSubmitted = new EventEmitter<any>();
    searchParams: StudySearchParams = {};
    userToken;
    constructor(private currentUserService: CurrentUserService) {}

    ngOnInit(): void {
        this.userToken = this.currentUserService.userToken;
    }
    doSubmit() {
        this.searchSubmitted.emit(this.searchParams);
        this.searchParams = {};
    }
}
