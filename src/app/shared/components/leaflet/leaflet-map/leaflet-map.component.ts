import { Component, Input, AfterViewChecked } from '@angular/core';

import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';


@Component({
  selector: 'kusunoki2-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements  AfterViewChecked {

    @Input() latitude;
    @Input() longitude;
    map;
    marker;
    config;
    private _id;
    @Input() set id(_id: string) {
        this._id = _id;
        this.drawMap(_id, this.latitude, this.longitude, this.config);
    }
    get id() {
        return this._id;
    }
    ngAfterViewChecked(): void {
        this.drawMap(this.id, this.latitude, this.longitude, this.config);
    }
    reconfigureLeafletMarkerForBug() {
        const iconRetinaUrl = 'marker-icon-2x.png';
        const iconUrl = 'marker-icon.png';
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

    drawMap(map_id, latitude, longitude, config) {

        if (map_id !== undefined && document.getElementById(map_id)) {
            if (longitude && latitude && this.map === undefined) {
                this.map = L.map(String(map_id)).setView([latitude, longitude], 8);
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);
                this.reconfigureLeafletMarkerForBug();
                this.marker = L.marker([latitude, longitude]).addTo(this.map);
            }
        }
    }
}
