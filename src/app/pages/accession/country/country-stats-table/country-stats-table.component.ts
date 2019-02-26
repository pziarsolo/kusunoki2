import { Component, ViewEncapsulation} from '@angular/core';
import { ObservableTableComponent } from 'src/app/shared/components/observable-table/observable-table.component';
import { AppUrls } from 'src/app/pages/appUrls';


@Component({
  selector: 'kusunoki2-country-stats-table',
  templateUrl: './country-stats-table.component.html',
  styleUrls: ['./country-stats-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountryStatsTableComponent extends ObservableTableComponent {
    appUrls = AppUrls;
}
