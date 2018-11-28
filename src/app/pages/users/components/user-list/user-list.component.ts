import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/entities/user.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppUrls } from '../../../appUrls';
import { Group } from '../../../../shared/entities/group.model';
import { UserService } from 'src/app/shared/services/user.service';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';


@Component({
  selector: 'kusunoki2-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit, OnChanges {
    users: Observable<User[]>;
    appUrls = AppUrls;

    columnsToDisplay = ['username', 'email', 'first_name', 'last_name'];
    @Input() initialQueryParams?: any;

    dataTable = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService,
                private router: Router,
                public currentUserService: CurrentUserService,
                private dialog: MatDialog,
                private groupService: GroupService,
                private statusService: StatusService) { }
    ngOnInit() {
        this.users = this.userService.list();
    }

    ngAfterViewInit() {
        this.dataTable.paginator = this.paginator;
    }

    navigateTo(baseUrl, queryParams) {
        queryParams = {...this.initialQueryParams, ...queryParams};
        this.router.navigate([baseUrl], {queryParams: queryParams});

    }
    buildQueryParams(params) {
        if (this.initialQueryParams) {

        }
        return params;

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['users'] && changes['users']['currentValue'] && this.users) {
            this.users.subscribe(data =>  {
                this.dataTable = new MatTableDataSource(data);
                this.dataTable.data = data;
                this.dataTable.sort = this.sort;
                this.dataTable.paginator = this.paginator;
            });
        }
    }

    addGroupDialog() {
        const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(groupName => {
            if (groupName) {
                const group = new Group();
                group.name = groupName;
                this.groupService.create(group)
                    .subscribe(response => {
                        this.statusService.success('Group created succesfully');
                    });
            }
        });
    }
}
