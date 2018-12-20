/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, SimpleChanges, OnChanges,
         AfterViewInit, AfterViewChecked, ElementRef, Output,
         EventEmitter
} from '@angular/core';
import { timeout } from 'rxjs/operators';

declare var google: any;

@Component({
    selector: 'kusunoki2-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnChanges, AfterViewChecked {
    defConfig = {zoom: 8,
                 draggable: true,
                 zoomControl: true,
                 scrollwheel: false,
                 scaleControl: true};
    @Input() config: any = this.defConfig;
    @Input() latitude;
    @Input() longitude;
    private _id;
    @Input() set id(_id: string) {
        this._id = _id;
        this.refreshMap();
    }
    get id() {
        return this._id;
    }
    @Output() whenMapReady: EventEmitter<any> = new EventEmitter();

    map: google.maps.Map;
    marker: google.maps.Marker;

    ngOnChanges(changes: SimpleChanges) {
        if (('latitude' in changes || 'longitude' in changes) && this.id) {
            this.drawMap(this.id, this.latitude, this.longitude, this.config);
            this.centerMap();
        }
    }
    ngAfterViewChecked(): void {
        this.refreshMap();
    }

    refreshMap() {
        this.drawMap(this.id, this.latitude, this.longitude, this.config);
    }
    drawMap(map_id, latitude, longitude, config) {
        if (map_id !== undefined && document.getElementById(map_id)) {
            if (longitude && latitude) {
                if (!this.map) {
                    const center = new google.maps.LatLng(latitude, longitude);
                    config.center = center;
                    this.map = new google.maps.Map(document.getElementById(map_id), config);
                    this.marker = new google.maps.Marker({position: center, map: this.map});
                }
            }
        }
    }
    centerMap() {
        if (this.map) {
            const center =  new google.maps.LatLng(this.latitude, this.longitude);
            this.map.setCenter(center);
            this.marker.setPosition(center);
        }
    }
}
