import { Component, Input } from '@angular/core';
import {
    SearchDataSourceNoRouter, TableWithFilterComponent
} from 'src/app/shared/components/table-with-filter/table-with-filter.component';
import { Task } from 'src/app/shared/entities/task.model';
import { AppUrls } from '../../appUrls';
import { SeedPetition } from 'src/app/shared/entities/seed_petition.model';

class SeedPetitionDataSource extends SearchDataSourceNoRouter<SeedPetition> { }

@Component({
    selector: 'kusunoki2-seed-petition-table',
    templateUrl: './seed-petition-table.component.html',
    styleUrls: ['./seed-petition-table.component.scss']
})
export class SeedPetitionTableComponent extends TableWithFilterComponent {
    entityType = 'seed_petition';
    defColumnsToDisplay = ['petition_id', 'name', 'type', 'petition_date', 'accessions'];
    @Input() columnsToDisplay: string[] = this.defColumnsToDisplay;
    columnsToDisplay2 = this.columnsToDisplay.concat('delete');
    extraSearchParams = {};
    appUrls = AppUrls;

    createDatasource() {
        this.dataSource = new SeedPetitionDataSource(
            this.service, this.columnsToDisplay, this.extraSearchParams);
    }
    deleteSeedPetition(petitionId) {
        this.service.delete(petitionId)
            .subscribe(
                () => {
                    this.statusService.info('Seed petition log successfully deleted');
                    this.doSearch({});
                },
                (error) => console.log(error)
            );
    }
}