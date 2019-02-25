import { Component, ViewEncapsulation} from '@angular/core';
import { ObservableTableComponent } from 'src/app/shared/components/observable-table/observable-table.component';
import { AppUrls } from 'src/app/pages/appUrls';


@Component({
  selector: 'kusunoki2-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountryTableComponent extends ObservableTableComponent {
    appUrls = AppUrls;
}
