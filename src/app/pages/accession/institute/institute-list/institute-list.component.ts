import { Component, ViewChild} from '@angular/core';
import { TableSearchPageComponent } from 'src/app/shared/components/table-search-page/table-search-page.component';
import { InstituteTableComponent } from '../institute-table/institute-table.component';


@Component({
  selector: 'kusunoki2-institute-list',
  templateUrl: './institute-list.component.html',
  styleUrls: ['./institute-list.component.scss']
})
export class InstituteListComponent extends TableSearchPageComponent{
    @ViewChild(InstituteTableComponent) table: InstituteTableComponent;
}
