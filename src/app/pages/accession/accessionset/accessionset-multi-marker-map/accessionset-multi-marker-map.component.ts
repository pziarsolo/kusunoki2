import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AccessionSetService } from 'src/app/shared/services/accessionset.service';
import { AppUrls } from 'src/app/pages/appUrls';
import { AccessionSet } from 'src/app/shared/entities/accessionset.model';
import { HttpResponse } from '@angular/common/http';
import { mergeMap, map, filter, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MapMarker } from 'src/app/shared/entities/mapMarker.model';

@Component({
  selector: 'kusunoki2-accessionset-multi-marker-map',
  templateUrl: './accessionset-multi-marker-map.component.html',
  styleUrls: ['./accessionset-multi-marker-map.component.scss']
})
export class AccessionsetMultiMarkerMapComponent implements OnChanges {
    @Input() searchParams;
    markers: Observable<MapMarker[]>;

    constructor(private service: AccessionSetService) {}


    ngOnChanges(changes: SimpleChanges): void {
        if ('searchParams' in changes && this.searchParams) {
            const searchParams = Object.assign({}, this.searchParams);
            searchParams['limit'] = 500;
            searchParams['fields'] = 'accessionsetNumber,longitudes,latitudes';
            this.service.list(searchParams)
                .pipe(
                    mergeMap((response: HttpResponse<AccessionSet[]>) => response.body),
                    map(item => {
                        if (item.data.latitudes.length > 0 && item.data.longitudes.length > 0) {
                            return {uid: item.data.accessionsetNumber,
                                    longitude: item.data.longitudes[0],
                                    latitude: item.data.latitudes[0],
                                    url: '/' + AppUrls.accessionsets + '/' + item.data.accessionsetNumber};
                        }
                    }),
                    filter(item => item !== undefined),
                    toArray()
                );
        }
    }
}
