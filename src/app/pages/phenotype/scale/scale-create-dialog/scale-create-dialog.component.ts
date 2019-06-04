import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'kusunoki2-scale-create-dialog',
  templateUrl: './scale-create-dialog.component.html',
  styleUrls: ['./scale-create-dialog.component.scss']
})
export class ScaleCreateDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ScaleCreateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    close(scale) {
        this.dialogRef.close(scale);
    }
}
