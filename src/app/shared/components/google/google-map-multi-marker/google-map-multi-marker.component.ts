/// <reference types="@types/googlemaps" />
import { Component, Input, SimpleChanges, OnChanges, AfterViewChecked } from '@angular/core';
import { MapMarker } from 'src/app/shared/entities/mapMarker.model';

declare var google: any;

@Component({
  selector: 'kusunoki2-google-map-multi-marker',
  templateUrl: './google-map-multi-marker.component.html',
})
export class GoogleMapMultiMarkerComponent implements OnChanges, AfterViewChecked {
    @Input() width: String = '99,9%';
    @Input() height: String = '500px';
    defConfig = {zoom: 3, center: {latitute: 18.78600, longitude: 8.977167}};
    @Input() config: object = this.defConfig;
    @Input() markers: MapMarker[];

    div_id = 'search_map';
    map: google.maps.Map;
    marker: google.maps.Marker[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if ('markers' in changes) {
            this.map = undefined;
            this.drawMap();
        }
    }
    drawMarkers() {
        if (this.markers) {
            for (const marker of this.markers) {
                if (marker.latitude && marker.longitude) {
                    const _marker = new google.maps.Marker({
                        position: new google.maps.LatLng(marker.latitude, marker.longitude),
                        map: this.map,
                        title: marker.uid,
                        url: marker.url
                    });
                    google.maps.event.addListener(_marker, 'click', function() {
                        window.location.href = _marker.url;
                    });
                }
            }
        }
    }
    drawMap() {
        if (document.getElementById(this.div_id)) {
            if (!this.map) {
                const conf = {zoom: this.defConfig.zoom,
                              center:  new google.maps.LatLng(this.defConfig.center.latitute,
                                                              this.defConfig.center.longitude)};

                this.map = new google.maps.Map(document.getElementById(this.div_id),
                                                                       conf);
                this.drawMarkers();
            }
        }
    }
    ngAfterViewChecked(): void {
        this.drawMap();
    }
}
