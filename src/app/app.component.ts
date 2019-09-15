import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PwaService } from './services/pwa.service';


import { slider } from './animations';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // fader,
    slider,
  ]

})
export class AppComponent implements OnInit {


  promptEvent: any;

  offline: boolean;

  isApp = false;


  constructor(public Pwa: PwaService, private swUpdate: SwUpdate, public auth: AuthService) {}

  ngOnInit() {
    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));

    window.addEventListener('appinstalled', (evt) => {
      console.log('pwa installed');
      alert('pwa installed');
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      // Take the user to a different screen here.
      this.isApp = true;
      console.log(`we are using a smartphone: ${navigator.userAgent}`);
    } else {
      // this.smartphone = false
      console.log(`we are using no smartphone: ${navigator.userAgent}`);
    }


    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          if (confirm('New version available. Load New Version?')) {
              window.location.reload();
          }
      });
    }


  }

  onNetworkStatusChange() {
    this.offline = !navigator.onLine;
    console.log('offline ' + this.offline);
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
