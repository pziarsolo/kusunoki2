import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchDataSource, TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { AccessionSet } from 'src/app/shared/entities/accessionset.model';
import { AppUrls } from '../../appUrls';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ServiceLocatorService } from 'src/app/shared/services/service-locator.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';



class AccessionSetDataSource extends SearchDataSource<AccessionSet> {
    getItemUrl(accessionset) {
        return ['/' + AppUrls.accessionsets,
                accessionset.data.accessionsetNumber];
    }
}

@Component({
  selector: 'kusunoki2-accessionset-list',
  templateUrl: './accessionset-list.component.html',
})
export class AccessionSetListComponent  extends TableListComponent {
    columnsToDisplay = ['accessionsetNumber', 'countries', 'genera'];
    entityType = 'accessionset';
    extraSearchParams = {};
    constructor(router: Router,
                route: ActivatedRoute,
                currentUserService: CurrentUserService,
                serviceLocator: ServiceLocatorService,
                statusService: StatusService) {
        super(router, route, currentUserService, serviceLocator, statusService);
    }
    createDatasource() {
        this.dataSource = new AccessionSetDataSource(this.service,
                                                     this.router,
                                                     this.columnsToDisplay,
                                                     this.extraSearchParams);
    }

}
