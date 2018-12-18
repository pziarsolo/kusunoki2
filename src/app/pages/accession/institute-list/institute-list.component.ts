import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CurrentUserService } from '../../../shared/services/current-user.service';
import { StatusService } from '../../../shared/StatusModule/status.service';
import { SearchDataSource, TableListComponent } from '../../../shared/components/table-list/table-list.component';
import { Institute } from '../../../shared/entities/institute.model';
import { ServiceLocatorService } from 'src/app/shared/services/service-locator.service';



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
    constructor(router: Router,
                route: ActivatedRoute,
                currentUserService: CurrentUserService,
                serviceLocator: ServiceLocatorService,
                statusService: StatusService) {

        super(router, route, currentUserService, serviceLocator, statusService);
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
