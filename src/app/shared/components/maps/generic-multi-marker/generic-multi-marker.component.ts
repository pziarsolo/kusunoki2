import { Component, OnInit, Input } from '@angular/core';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { AppConfig } from 'src/app/shared/entities/app-config.model';
import { MapMarker } from 'src/app/shared/entities/mapMarker.model';

@Component({
  selector: 'kusunoki2-generic-multi-marker',
  templateUrl: './generic-multi-marker.component.html',
  styleUrls: ['./generic-multi-marker.component.scss']
})
export class GenericMultiMarkerComponent {
    appConfig: AppConfig;
    @Input() width: String = '99,9%';
    @Input() height: String = '500px';
    defConfig = {zoom: 3, center: {latitude: 18.78600, longitude: 8.977167}};
    @Input() config = this.defConfig;
    @Input() markers: MapMarker[];


    constructor(private appConfigServer: AppConfigService) {
        this.appConfig = this.appConfigServer.getConfig();
    }
}
