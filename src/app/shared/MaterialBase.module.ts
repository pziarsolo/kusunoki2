import { NgModule } from '@angular/core';

import {
    MatIconModule,
    MatButtonModule,
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
    MatSortModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatGridListModule,
    MatTabsModule,
    MatProgressBarModule
} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
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
        MatSortModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatMomentDateModule,
        MatGridListModule,
        MatTabsModule,
        MatProgressBarModule,
        DragDropModule,
        ScrollingModule
    ]
})
export class MaterialBaseModule { }
