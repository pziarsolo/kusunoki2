import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { map } from 'rxjs/operators';


@Component({
    selector: 'kusunoki2-home',
    template: `
        <mat-card>
            <mat-card-content>
                Home
            </mat-card-content>
        </mat-card>`
})
export class HomeComponent {
    constructor(private http: HttpClient) {}
}
