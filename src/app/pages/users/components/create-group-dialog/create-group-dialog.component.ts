import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kusunoki2-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent implements OnInit {
    groupName: string;
    constructor() { }

    ngOnInit() {
    }

}
