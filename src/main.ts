import 'swiper/element/bundle';
import { routes } from './app/app.routes';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
addIcons(allIcons);

import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    Storage,
  ],
});
