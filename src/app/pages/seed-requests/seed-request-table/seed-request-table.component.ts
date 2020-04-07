import { Component, Input } from '@angular/core';
import { SearchDataSourceNoRouter, TableWithFilterComponent
} from 'src/app/shared/components/table-with-filter/table-with-filter.component';
import { AppUrls } from '../../appUrls';
import { SeedRequest } from 'src/app/pages/seed-requests/entities/seed_request.model';

class SeedRequestDataSource extends SearchDataSourceNoRouter<SeedRequest> { }

@Component({
    selector: 'kusunoki2-seed-request-table',
    templateUrl: './seed-request-table.component.html',
    styleUrls: ['./seed-request-table.component.scss']
})
export class SeedRequestTableComponent extends TableWithFilterComponent {
    entityType = 'seed_request';
    defColumnsToDisplay = ['request_uid', 'name', 'type', 'request_date', 'accessions'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    columnsToDisplay2 = this.columnsToDisplay.concat('delete');
    extraSearchParams = {};
    appUrls = AppUrls;

    createDatasource() {
        this.dataSource = new SeedRequestDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
    deleteSeedPetition(requestUid: string) {
        this.service.delete(requestUid)
            .subscribe(
                () => {
                    this.statusService.info('Seed request log successfully deleted');
                    this.doSearch({});
                },
                (error) => console.log(error)
            );
    }
}
