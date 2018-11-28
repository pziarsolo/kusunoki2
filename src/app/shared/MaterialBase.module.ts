import { NgModule } from '@angular/core';

import {
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
} from '@angular/material';

@NgModule({
    exports : [
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatSidenavModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatMenuModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,

    ]
})
export class MaterialBaseModule { }
