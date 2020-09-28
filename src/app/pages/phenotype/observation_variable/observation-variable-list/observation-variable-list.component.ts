import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { ObservationVariableTableComponent
} from 'src/app/shared/components/entity-tables/observation-variable-table/observation-variable-table.component';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'kusunoki2-observation-variable-list',
  templateUrl: './observation-variable-list.component.html',
  styleUrls: ['./observation-variable-list.component.scss']
})
export class ObservationVariableListComponent extends TableSearchPageComponent {
    appConfig: AppConfig;
    @ViewChild(ObservationVariableTableComponent) table: ObservationVariableTableComponent;
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected location: Location,
        public currentUserService: CurrentUserService,
        private appConfigService: AppConfigService) {

        super(route, router, location, currentUserService);
        this.appConfig = this.appConfigService.getConfig()
    }

}
