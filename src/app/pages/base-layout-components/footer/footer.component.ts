import { Component, OnInit, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'kusunoki2-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
    centralColumnSize: string;
    appConfig: AppConfig;
    footerUrl: string;
    hasLogo = false;

    constructor(private configService: AppConfigService,
                @Inject(APP_BASE_HREF) private baseHref: string,
                private httpClient: HttpClient) {
        this.appConfig = this.configService.getConfig();
        this.centralColumnSize = this.appConfig.centralColumnSize;
        baseHref = this.baseHref.substring(1);
        this.footerUrl = `${baseHref}assets/images/footer_image.gif`;
    }

    ngOnInit(): void {
        this.httpClient.get(this.footerUrl, { responseType: 'blob' })
            .subscribe(
                () => this.hasLogo = true,
                () => this.hasLogo = true
            );

    }
}
