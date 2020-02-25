import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  segment = 'friends'
  constructor() {}

  // ionViewWillEnter() {
  // }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
