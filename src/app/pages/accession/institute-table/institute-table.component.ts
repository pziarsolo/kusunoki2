import { Component } from '@angular/core';
import { ObservableTableComponent } from 'src/app/shared/components/observable-table/observable-table.component';
import { AppUrls } from '../../appUrls';

@Component({
  selector: 'kusunoki2-institute-table',
  templateUrl: './institute-table.component.html',
  styleUrls: ['./institute-table.component.scss']
})
export class InstituteTableComponent extends ObservableTableComponent {
    appUrls = AppUrls;
}
