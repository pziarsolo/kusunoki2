import {Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import {StatusService} from './status.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'kusunoki2-status',
    templateUrl: 'status.component.html'
})
export class StatusComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    constructor(private status_service: StatusService,
                public snackBar: MatSnackBar) {}

    ngOnInit() {
        /* En este punto es donde desde nuestro componente se Suscribe al método del servicio cuando el mensaje que se quiere
         * mostrar ya está listo para hacerlo. */
        this.subscription = this.status_service.getMessage()
            .subscribe(resp => {
                const level = resp.resp.level;
                const msg = resp.resp.message;
                let severity;
                if (level === 2) {
                    severity = 'sucess';
                }
                if (level === 3) { // info
                    severity = 'info';
                }
                if (level === 4) { // warning
                    severity = 'warn';
                }
                if (level === 5) { // error
                    severity = 'error';
                }
                this.snackBar.open(msg, severity, {duration: 5000});
            });

    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();

    }
}
