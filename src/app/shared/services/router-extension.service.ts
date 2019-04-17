import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, ActivatedRoute, Event } from '@angular/router';
import { filter, tap, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class RouterExtService {

    private previousUrl: string = undefined;
    private currentUrl: string = undefined;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title) {
        this.currentUrl = this.router.url;
        // router.events.subscribe(event => {
        //     if (event instanceof NavigationEnd) {
        //         this.previousUrl = this.currentUrl;
        //         this.currentUrl = event.url;
        //     }
        // });
        this.router.events
            .pipe(
                filter((event: Event) => event instanceof NavigationEnd),
                tap((event: NavigationEnd) => {
                    this.previousUrl = this.currentUrl;
                    this.currentUrl = event.url;
                }),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                        return route;
                }),
                filter((route) => route.outlet === 'primary'),
                mergeMap((route) => route.data)
            )
            .subscribe((event) => this.titleService.setTitle(event['title']));

    }

    public getPreviousUrl() {
        return this.previousUrl;
    }
}
