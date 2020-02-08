import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private auth: AuthService) {}

  ionViewWillEnter() {
    // this.auth.currentUser.subscribe(user => {
    //   if (user) {
    //     this.presentAlert('User is logged in!');
    //     console.log(user);
    //   }
    // });
    console.log(this.auth.isAuthenticated());
  }
}
