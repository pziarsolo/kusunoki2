import { Component } from '@angular/core';
import { ObservableTableComponent } from 'src/app/shared/components/observable-table/observable-table.component';
import { AppUrls } from 'src/app/pages/appUrls';

@Component({
  selector: 'kusunoki2-institute-stats-table',
  templateUrl: './institute-stats-table.component.html',
  styleUrls: ['./institute-stats-table.component.scss']
})
export class InstituteStatsTableComponent extends ObservableTableComponent {
    appUrls = AppUrls;
}
