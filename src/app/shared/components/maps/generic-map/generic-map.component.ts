import { Component, OnInit, Input } from '@angular/core';
import { AppConfigService } from '../../../services/app-config.service';
import { AppConfig } from '../../../entities/app-config.model';

@Component({
  selector: 'kusunoki2-generic-map',
  templateUrl: './generic-map.component.html',
  styleUrls: ['./generic-map.component.scss']
})
export class GenericMapComponent {
    appConfig: AppConfig;

    @Input() id;
    @Input() latitude;
    @Input() longitude;

    constructor(private appConfigServer: AppConfigService) {
        this.appConfig = this.appConfigServer.getConfig();
    }

}
