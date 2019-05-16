import { Component, } from '@angular/core';
// import { MatSidenav, MatNavList } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { environment } from '../../../../environments/environment';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

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
    centralColumnSize: string;
    appConfig: AppConfig;

    constructor(private breakpointObserver: BreakpointObserver,
                private appConfigService: AppConfigService) {
        this.appConfig = this.appConfigService.getConfig();
        this.centralColumnSize = this.appConfig.centralColumnSize;
        }
}
