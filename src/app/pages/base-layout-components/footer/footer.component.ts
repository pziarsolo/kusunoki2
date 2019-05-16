import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
@Component({
  selector: 'kusunoki2-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    centralColumnSize: string;
    appConfig: AppConfig;

    constructor(private configService: AppConfigService) {
        this.appConfig = this.configService.getConfig();
        this.centralColumnSize = this.appConfig.centralColumnSize;
    }
}
