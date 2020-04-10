import { Component, OnInit } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, NavigationStart } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  isLoggedIn = false;
  counter = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.listenOnHardwareBackButton();

    // this.platform.backButton.subscribe(() => {
    //   if (this.router.url === '/home') {
    //     // Back button controls when user is not in Login Page
    //     navigator['app'].exitApp();
    //   }
    // });
  }

  private listenOnHardwareBackButton() {
    if (this.platform.is("android")) {
      this.platform.backButton.subscribeWithPriority(0, () => {
        if (this.router.url === "/home") {
          // Back button controls when user is not in Login Page
          navigator["app"].exitApp();
        }

        if (this.counter === 0) {
          const appStr = "app";
          navigator[appStr].exitApp();
        }
        this.navCtrl.back();
      });
      this.router.events
        .pipe(filter((event) => event instanceof NavigationStart))
        .subscribe((event: NavigationStart) => {
          if (event.navigationTrigger === "popstate") {
            this.counter--;
          } else {
            this.counter++;
          }
        });
    }
  }
}
