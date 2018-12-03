import { Component, OnInit, Input } from '@angular/core';
import { Institute } from 'src/app/shared/entities/institute.model';
import { InstituteService } from 'src/app/shared/services/institute.service';

@Component({
  selector: 'kusunoki2-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {
    @Input() instituteCode: string;
    institute: Institute;

    constructor(private instituteService: InstituteService) {}

    ngOnInit() {
        this.instituteService.retrieve(this.instituteCode)
            .subscribe(institute => this.institute = institute);
    }

}
