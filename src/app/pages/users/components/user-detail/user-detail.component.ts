import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/entities/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'kusunoki2-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    user: User;
    username: string;
    edit_mode: Boolean = false;

    constructor(private userService: UserService,
                private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.username = params.username;
        });
    }

    ngOnInit() {
        this.userService.retrieve(this.username)
            .subscribe(user => this.user = user);

    }

}
