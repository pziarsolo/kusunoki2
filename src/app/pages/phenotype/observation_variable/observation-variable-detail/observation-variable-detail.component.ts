import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kusunoki2-observation-variable-detail',
  templateUrl: './observation-variable-detail.component.html',
  styleUrls: ['./observation-variable-detail.component.scss']
})
export class ObservationVariableDetailComponent implements OnInit, OnDestroy {
    name: string;
    createMode = false;
    editMode = false;
    routerSubscription: Subscription;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.routerSubscription = this.route.params.subscribe(params => {
            if (params.name === 'create') {
                this.createMode = true;
                this.editMode = true;
                this.name = undefined;
            } else {
                this.name = params.name;
            }
        });
    }
    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}