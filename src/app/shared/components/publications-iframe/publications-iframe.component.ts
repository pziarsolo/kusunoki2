import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../entities/app-config.model';
import { AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'kusunoki2-publications-iframe',
  templateUrl: './publications-iframe.component.html',
  styleUrls: ['./publications-iframe.component.scss']
})
export class PublicationsIframeComponent {
    appConfig: AppConfig;
    url: string;
    constructor(private appConfigService: AppConfigService) {
        this.appConfig =  this.appConfigService.getConfig();
        this.url = this.appConfig.pubDbUrl;
    }
}
