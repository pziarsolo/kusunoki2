import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TableListComponent, SearchDataSource } from 'src/app/shared/components/table-list/table-list.component';
import { Country } from 'src/app/shared/entities/country.model';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ServiceLocatorService } from 'src/app/shared/services/service-locator.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';



class CountryStatsDataSource extends SearchDataSource<Country> {
    getItemUrl(country) {
        return ['/countries/' + country.code];
    }
}

@Component({
    selector: 'kusunoki2-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent extends TableListComponent {
    entityType = 'country';
    columnsToDisplay = ['code', 'name', 'num_accessions', 'num_accessionsets'];
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
        this.dataSource = new CountryStatsDataSource(this.service,
                                                     this.router,
                                                     this.columnsToDisplay,
                                                     this.extraSearchParams);
    }

    navigateTo(baseUrl, queryParams) {
        this.router.navigate([baseUrl], {queryParams: queryParams});
    }
}
