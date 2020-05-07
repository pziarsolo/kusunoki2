import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'kusunoki2-root',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = environment.config.title;

}
