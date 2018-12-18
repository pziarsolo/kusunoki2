import { Component} from '@angular/core';
import { ObservableTableComponent } from 'src/app/shared/components/observable-table/observable-table.component';
import { AppUrls } from '../../appUrls';


@Component({
  selector: 'kusunoki2-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent extends ObservableTableComponent {
    appUrls = AppUrls;
}
