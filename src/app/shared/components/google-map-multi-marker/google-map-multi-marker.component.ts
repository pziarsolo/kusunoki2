/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterViewChecked } from '@angular/core';
import { AppUrls } from 'src/app/pages/appUrls';

declare var google: any;

@Component({
  selector: 'kusunoki2-google-map-multi-marker',
  templateUrl: './google-map-multi-marker.component.html',
})
export class GoogleMapMultiMarkerComponent implements OnChanges, AfterViewChecked {
    @Input() width: String = '99,9%';
    @Input() height: String = '500px';
    defConfig = {zoom: 3, center: new google.maps.LatLng(18.78600, 8.977167)};
    @Input() config: object = this.defConfig;
    @Input() markers;

    div_id = 'search_map';
    map: google.maps.Map;
    marker: google.maps.Marker[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if ('markers' in changes) {
            this.map = undefined;
            this.drawMap();
            // this.drawMarkers();
            // console.log(changes.markers);
        }
    }
    drawMarkers() {
        if (this.markers) {
            for (const accessionSet of this.markers) {
                const uid = accessionSet.data.accessionsetNumber;
                const latitude = accessionSet.data.latitudes[0];
                const longitude = accessionSet.data.longitudes[0];
                if (latitude && longitude) {
                    const _marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latitude, longitude),
                        map: this.map,
                        title: uid,
                        url: AppUrls.accessionsets + '/' + uid
                    });
                    google.maps.event.addListener(_marker, 'click', function() {
                        window.location.href = _marker.url;
                    });
                }
                // for (const marker of accessionSet.coords) {
                //     if (marker.latitude && marker.longitude) {
                //         const _marker = new google.maps.Marker(
                //                             {position: new google.maps.LatLng(marker.latitude,
                //                                                                 marker.longitude),
                //                             map: this.map,
                //                             title: uid,
                //                             url: AppUrls.accessionsets + '/' + uid});
                //         google.maps.event.addListener(_marker, 'click', function() {
                //             window.location.href = _marker.url; });
                //     }
                // }
            }
        }
    }
    drawMap() {
        if (document.getElementById(this.div_id)) {
            if (!this.map) {
                this.map = new google.maps.Map(document.getElementById(this.div_id),
                                                                       this.config);
                this.drawMarkers();
            }
        }
    }
    ngAfterViewChecked(): void {
        this.refreshMap();
    }

    refreshMap() {
        this.drawMap();
    }
}
