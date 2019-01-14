import {NgModule} from '@angular/core';

import {Minus2SpacePipe} from './minus2space.pipe';
import {ContainsPipe} from './contains.pipe';
import {HasOwnPropertyPipe} from './hasownproperty.pipe';
import {KeysPipe} from './keys.pipe';
import {ToStringPipe} from './tostring.pipe';
import { CommonModule } from '@angular/common';
import { MomentsMCPDPipe } from './momentsMCPD.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ContainsPipe,
        Minus2SpacePipe,
        HasOwnPropertyPipe,
        KeysPipe,
        ToStringPipe,
        MomentsMCPDPipe
    ],
    exports: [
        ContainsPipe,
        Minus2SpacePipe,
        HasOwnPropertyPipe,
        KeysPipe,
        ToStringPipe,
        MomentsMCPDPipe
    ]
})
export class PipesModule { }
