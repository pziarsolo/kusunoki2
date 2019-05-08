import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AccessionService } from 'src/app/shared/services/accession.service';
import { Accession } from 'src/app/shared/entities/accession.model';
import { HttpResponse } from '@angular/common/http';
import { AppUrls } from 'src/app/pages/appUrls';
import { map, mergeMap, filter, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MapMarker } from 'src/app/shared/entities/mapMarker.model';

@Component({
  selector: 'kusunoki2-accession-multi-marker-map',
  templateUrl: './accession-multi-marker-map.component.html',
  styleUrls: ['./accession-multi-marker-map.component.scss']
})
export class AccessionMultiMarkerMapComponent implements OnChanges {
    @Input() searchParams;
    markers: Observable<MapMarker[]>;

    constructor(private service: AccessionService) {}


    ngOnChanges(changes: SimpleChanges): void {
        if ('searchParams' in changes && this.searchParams) {
            const searchParams = Object.assign({}, this.searchParams);
            searchParams['limit'] = 500;
            // searchParams['fields'] ='germplasmNumber,longitude,latitude';
            this.markers = this.service.list(searchParams)
                .pipe(
                    mergeMap((response: HttpResponse<Accession[]>) => response.body),
                    map(item => {
                        const accession = new Accession(item);
                        if (accession.data.latitude && accession.data.longitude) {
                            let url = '/' + AppUrls.accessions;
                            url += '/' + accession.data.instituteCode;
                            url += '/' + accession.data.germplasmNumber;
                            return {uid: accession.data.germplasmNumber,
                                    longitude: accession.data.longitude,
                                    latitude: accession.data.latitude,
                                    url: url};
                        }
                    }),
                    filter(item => item !== undefined),
                    toArray()
                );
        }

    }
}
