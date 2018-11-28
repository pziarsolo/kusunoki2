import {NgModule} from '@angular/core';

import {Minus2SpacePipe} from './minus2space.pipe';
import {ContainsPipe} from './contains.pipe';
import {HasOwnPropertyPipe} from './hasownproperty.pipe';
import {KeysPipe} from './keys.pipe';
import {ToStringPipe} from './tostring.pipe';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ContainsPipe,
        Minus2SpacePipe,
        HasOwnPropertyPipe,
        KeysPipe,
        ToStringPipe
    ],
    exports: [
        ContainsPipe,
        Minus2SpacePipe,
        HasOwnPropertyPipe,
        KeysPipe,
        ToStringPipe
    ]
})
export class PipesModule { }
