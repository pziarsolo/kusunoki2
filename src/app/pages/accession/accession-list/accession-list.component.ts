import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchDataSource, TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { Accession } from 'src/app/shared/entities/accession.model';
import { AppUrls } from '../../appUrls';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { ServiceLocatorService } from 'src/app/shared/services/service-locator.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';


class AccessionDataSource extends SearchDataSource<Accession> {
    getItemUrl(accession) {
        return ['/' + AppUrls.accessions, accession.data.instituteCode,
                accession.data.germplasmNumber];
    }
}

@Component({
    selector: 'kusunoki2-accession-list',
    templateUrl: './accession-list.component.html',
    styleUrls: ['./accession-list.component.scss'],
})
export class AccessionListComponent extends TableListComponent {
    entityType = 'accession';
    columnsToDisplay = ['instituteCode', 'germplasmNumber', 'countries', 'genera'];
    extraSearchParams = {};
    constructor(router: Router,
                route: ActivatedRoute,
                currentUserService: CurrentUserService,
                serviceLocator: ServiceLocatorService,
                statusService: StatusService) {
        super(router, route, currentUserService, serviceLocator, statusService);
    }
    createDatasource() {
        this.dataSource = new AccessionDataSource(this.service,
                                                  this.router,
                                                  this.columnsToDisplay,
                                                  this.extraSearchParams);
    }
    getId(searchItem) {
        return {instituteCode: searchItem['instituteCode'],
                dataSource: searchItem['dataSource'],
                germplasmNumber: searchItem['germplasmNumber']};
    }
}
