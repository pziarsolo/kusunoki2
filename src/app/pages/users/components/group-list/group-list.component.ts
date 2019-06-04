import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { Group } from 'src/app/shared/entities/group.model';

@Component({
  selector: 'kusunoki2-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
    @Input() groups = [];
    @Input() edit_mode: Boolean = false;
    initial_groups;
    constructor(private readonly groupService: GroupService,
                private currentUserService: CurrentUserService,
                private dialog: MatDialog,
                private statusService: StatusService) { }
    selectedValue;
    allGroups: Observable<Group[]>;

    ngOnInit() {
        this.allGroups = this.groupService.list();
        if (this.groups) {
            this.initial_groups = this.groups.map(x => Object.assign({}, x));
        } else {
            this.initial_groups = [];
            this.groups = [];
        }
    }

    removeGroupfromList(group_name) {
        const index = this.groups.findIndex(x => x.name === group_name);
        if (index > -1) {
            this.groups.splice(index, 1);
        }
    }

    addGroupToList(group_name) {
        const index = this.groups.findIndex(x => x.name === group_name);
        if (index === -1) {
            this.groups.push({'name': group_name});
        }
    }

    formReset() {
        this.groups = this.initial_groups.map(x => Object.assign({}, x));
    }

    createGroup() {
        const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(groupName => {
            if (groupName) {
                const group = new Group();
                group.name = groupName;
                this.groupService.create(group)
                    .subscribe(response => {
                        this.allGroups = this.groupService.list();
                        this.statusService.success('Group created succesfully');
                    });
            }
        });
    }

}
