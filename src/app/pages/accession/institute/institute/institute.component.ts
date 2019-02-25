import { Component, OnInit, Input } from '@angular/core';
import { Institute } from 'src/app/shared/entities/institute.model';
import { InstituteService } from 'src/app/shared/services/institute.service';
import { AppUrls } from 'src/app/pages/appUrls';

@Component({
  selector: 'kusunoki2-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent {
    @Input() institute: Institute;
    appUrls = AppUrls;

    constructor(private instituteService: InstituteService) {}
}
