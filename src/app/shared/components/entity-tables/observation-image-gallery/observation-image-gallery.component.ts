import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { ObservationImageService } from 'src/app/shared/services/observation_image.service';

@Component({
  selector: 'kusunoki2-observation-image-gallery',
  templateUrl: './observation-image-gallery.component.html',
  styleUrls: ['./observation-image-gallery.component.scss']
})
export class ObservationImageGalleryComponent implements OnInit {
    _searchParams: any;
    @Input() set searchParams(value: any) {
        this._searchParams = value;
        this.doSearch(this._searchParams);
    }
    get searchParams(): any {
        return this._searchParams;
    }
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private service: ObservationImageService) { }


    doSearch(searchParams) {
        searchParams = Object.assign({}, searchParams);
        this.service.list(searchParams)
            .subscribe(response => {
                this.galleryImages = response.body.map(item => {
                    return {small: item.image_small, medium: item.image_medium, big: item.image};
                });
            });
    }

    ngOnInit() {
        this.galleryOptions = [
            {
                width: '600px', height: '400px', previewCloseOnClick: true,
                previewCloseOnEsc: true, previewAnimation: false, previewZoom: true,
                previewRotate: true, previewDownload: true,
                thumbnailsArrowsAutoHide: true,
                imageArrowsAutoHide: true, arrowPrevIcon: 'fa fa-angle-left',
                arrowNextIcon: 'fa fa-angle-right', closeIcon: 'fa fa-times',
                fullscreenIcon: 'fa fa-expands-arrows',
                spinnerIcon: 'fa fa-refresh fa-spin fa-3x fa-fw', previewFullscreen: true
            },
            {
                breakpoint: 800, width: '100%', height: '400px',
                thumbnailsColumns: 3
            },
            {
                breakpoint: 500, width: '300px', height: '300px', thumbnailsColumns: 3
            },
            {
                breakpoint: 300, width: '100%', height: '200px', thumbnailsColumns: 2 }
        ];
    }
}

