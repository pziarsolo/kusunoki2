import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, INgxGalleryImage, NgxGalleryComponent } from '@kolkov/ngx-gallery';
import { ObservationImageService } from 'src/app/shared/services/observation_image.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { StatusService } from 'src/app/shared/StatusModule/status.service';
import { MatDialog } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';

export declare class NgxGalleryImageOwn implements INgxGalleryImage {
    small?: string | SafeResourceUrl;
    medium?: string | SafeResourceUrl;
    big?: string | SafeResourceUrl;
    description?: string;
    url?: string;
    label?: string;
    uid?: string;
    constructor(obj: INgxGalleryImage);
}

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
    galleryImages: NgxGalleryImageOwn[];

    @Output() imagesFound = new EventEmitter<boolean>();

    @ViewChild('gallery') gallery: NgxGalleryComponent;
    constructor(private service: ObservationImageService,
        private readonly statusService: StatusService,
        public dialog: MatDialog) { }


    doSearch(searchParams) {
        searchParams = Object.assign({}, searchParams);
        this.service.list(searchParams)
            .subscribe(response => {
                let imagesFound;
                if (response.body.length > 0) {
                    imagesFound = true;
                } else {
                    imagesFound = false;
                }
                this.imagesFound.emit(imagesFound);

                this.galleryImages = response.body.map(item => {
                    return {small: item.image_small,
                            medium: item.image_medium,
                            big: item.image,
                            uid: item.observation_image_uid};
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
                spinnerIcon: 'fa fa-refresh fa-spin fa-3x fa-fw', previewFullscreen: true,
                actions: [{icon: 'fa fa-times-circle',
                           onClick: this.delete.bind(this),
                           titleText: 'delete'}]
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
    delete(event, index) {
        const image = this.galleryImages[index];
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '800px',
            data: {type: 'Image',
                   description: `Image: ${image.uid}`}
        });
        dialogRef.afterClosed().subscribe(doDeleteInstitute => {
            if (doDeleteInstitute) {
                this.service.delete(image.uid)
                    .subscribe(
                        response => {
                            this.statusService.info('Image sucessfully deleted');
                            this.galleryImages.splice(index, 1);
                            this.gallery.preview.close();
                            // this.instituteDeleted.emit();
                        },
                        error => {
                            let msg;
                            if (error.status === 401 || error.status === 403) {
                                msg = 'Not authorized to delete the image';
                            } else {
                                msg = 'Could not delete Image';
                            }
                            this.statusService.error(msg);
                        }
                    );
            }
        });
    }
}

