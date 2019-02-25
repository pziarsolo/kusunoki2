import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ServiceLocatorService } from 'src/app/shared/services/service-locator.service';
import { MatDialog } from '@angular/material';
import { SearchDataSource, TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { Institute } from 'src/app/shared/entities/institute.model';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';



class InstituteStatsDataSource extends SearchDataSource<Institute> {
    getItemUrl(item) {
        return ['/' + item.instituteCode];
    }
}

@Component({
  selector: 'kusunoki2-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrls: ['./institute-list.component.scss']
})
export class InstituteListComponent extends TableListComponent {
    entityType = 'institute';
    columnsToDisplay = ['instituteCode', 'name', 'num_accessions', 'num_accessionsets'];
    hasSearchService = false;
    extraSearchParams = {'only_with_accessions': true};
    constructor(
        router: Router,
        route: ActivatedRoute,
        currentUserService: CurrentUserService,
        serviceLocator: ServiceLocatorService,
        statusService: StatusService,
        protected dialog: MatDialog) {
        super(router, route, currentUserService, serviceLocator, statusService,
              dialog);
    }
    createDatasource() {
        this.dataSource = new InstituteStatsDataSource(this.service,
                                                       this.router,
                                                       this.columnsToDisplay,
                                                       this.extraSearchParams);
    }

    navigateTo(baseUrl, queryParams) {
        this.router.navigate([baseUrl], {queryParams: queryParams});
    }
}
