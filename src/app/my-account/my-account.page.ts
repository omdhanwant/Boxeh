import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { User } from '../shared-module/models/User';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { LoginResponse } from '../shared-module/models/LoginResponse';
import { Utils } from '../shared-module/utils/constants';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage {
  loading = false;
  userDetails: any;
 
  constructor(private auth: AuthService, private alertService: AlertService, private nav: NavController) {
    this.userDetails = null;
   }

  ionViewDidEnter() {
    if(localStorage.getItem('userDetails')){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }else{
      this.userDetails = null;
    }
  }
  
  logout() {
    this.auth.logout();
    this.alertService.presentAlert(Utils.SUCCESS , 'Successfully logged out!' , [Utils.OK]);
    this.nav.navigateBack('/home');
    localStorage.clear();
  }
  
}
