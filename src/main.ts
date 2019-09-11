import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

}
if (environment.config.useGoogleMaps === true &&
    environment.config.googleMapsApiKey !== undefined) {

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.config.googleMapsApiKey}`;
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
