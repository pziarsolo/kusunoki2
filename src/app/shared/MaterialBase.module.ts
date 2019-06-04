import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
        ScrollingModule,
        MatChipsModule
    ]
})
export class MaterialBaseModule { }
