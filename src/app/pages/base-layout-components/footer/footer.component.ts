import { Component, OnInit} from '@angular/core';
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
                private httpClient: HttpClient) {
        this.appConfig = this.configService.getConfig();
        this.centralColumnSize = this.appConfig.centralColumnSize;
        this.footerUrl = `assets/images/footer_image.gif`;
    }

    ngOnInit(): void {
        this.httpClient.get(this.footerUrl, { responseType: 'blob' })
            .subscribe(
                () => this.hasLogo = true,
                () => this.hasLogo = true
            );

    }
}
