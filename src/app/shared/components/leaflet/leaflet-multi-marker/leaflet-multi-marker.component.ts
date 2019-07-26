/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, SimpleChanges, OnChanges, AfterViewChecked } from '@angular/core';
import { MapMarker } from 'src/app/shared/entities/mapMarker.model';


import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

interface LatLong {
    latitude: number;
    longitude: number;
}

interface MapConfig {
    center: LatLong;
    zoom: number;
}

@Component({
  selector: 'kusunoki2-leaflet-multi-marker',
  templateUrl: './leaflet-multi-marker.component.html',
})
export class LeafletMultiMarkerComponent implements OnChanges, AfterViewChecked {
    @Input() width: String = '99,9%';
    @Input() height: String = '500px';
    defConfig = {zoom: 3, center: {latitude: 18.78600, longitude: 8.977167}};
    @Input() config: MapConfig = this.defConfig;
    @Input() markers: MapMarker[];

    div_id = 'search_map';

    map;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if ('markers' in changes) {
            this.map = undefined;
            this.drawMap();
        }
    }
    reconfigureLeafletMarkerForBug() {
        const iconRetinaUrl = 'assets/marker-icon-2x.png';
        const iconUrl = 'assets/marker-icon.png';
        const shadowUrl = 'assets/marker-shadow.png';
        const iconDefault = icon({
            iconRetinaUrl,
            iconUrl,
            shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]});
        Marker.prototype.options.icon = iconDefault;
    }
    drawMarkers() {
        this.reconfigureLeafletMarkerForBug();

        if (this.markers) {
            for (const marker of this.markers) {
                if (marker.latitude && marker.longitude) {
                    const marker_ = L.marker([marker.latitude, marker.longitude]).addTo(this.map)
                        .addEventListener('click', function() {
                            window.location.href = marker.url; });
                    marker_.bindPopup(marker.uid);
                    marker_.on('mouseover', function (e) {
                        this.openPopup();
                    });
                    marker_.on('mouseout', function (e) {
                        this.closePopup();
                    });
                }
            }
        }
    }
    drawMap() {
        if (document.getElementById(this.div_id)) {
            if (!this.map) {
                this.map = L.map(this.div_id).setView([this.config.center.latitude,
                                                       this.config.center.longitude],
                                                      this.config.zoom);
                L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);
                this.drawMarkers();
            }
        }
    }
    ngAfterViewChecked(): void {
        this.drawMap();
    }
}
