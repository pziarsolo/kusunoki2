import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServiceLocatorService {
    injector: Injector;

    constructor(injector: Injector) {
        this.injector = injector;
    }
}
