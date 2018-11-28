import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from './status.service';
import { StatusComponent } from './status.component';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        StatusComponent
    ],
    exports: [
        StatusComponent
    ]
})
export class StatusModule { }
