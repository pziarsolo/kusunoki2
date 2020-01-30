import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlatPageService } from '../../services/flatpage.service';
import { Router } from '@angular/router';

interface PageData {
    title: string;
    content: string[];
}

@Component({
    selector: 'kusunoki2-flatpages',
    templateUrl: './flatpages.component.html',
    styleUrls: ['./flatpages.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlatpagesComponent implements OnInit {
    pageContent;
    pageData: PageData;
    NotFoundPage = {
        title: 'Page not found',
        content: 'Sal del sembrao que me estas pisando los tomates'
    };
    constructor(private service: FlatPageService,
        private router: Router) { }

    ngOnInit() {
        let path = this.router.url;
        if (path === '/') {
            path = '/home';
        }
        this.service.get(path).subscribe(
            (pageData: PageData) => {
                this.pageContent = {
                    title: pageData.title, content: pageData.content.join('')
                };
            },
            (error) => {
                if (error.status === 404) {
                    this.pageContent = this.NotFoundPage;
                } else {
                    this.pageContent = {
                        title: 'There was an error',
                        content: error.error
                    };
                }
            }
        );

    }

}
