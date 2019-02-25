import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kusunoki2-trait-create-dialog',
  templateUrl: './trait-create-dialog.component.html',
  styleUrls: ['./trait-create-dialog.component.scss']
})
export class TraitCreateDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<TraitCreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    close(trait) {
        this.dialogRef.close(trait);

    }
}
