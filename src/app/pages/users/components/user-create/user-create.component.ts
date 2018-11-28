import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/entities/user.model';

@Component({
  selector: 'kusunoki2-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
    user: User;
    edit_mode: Boolean = true;
    create_mode: Boolean = true;

    ngOnInit() {
        this.user = new User();
    }
}
