import { Component, } from '@angular/core';
// import { MatSidenav, MatNavList } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'kusunoki2-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );
    // @ViewChild(MatSidenav) sidenav: MatSidenav;
    centralColumnSize = environment.centralColumnSize;

    constructor(private breakpointObserver: BreakpointObserver) {}
}
