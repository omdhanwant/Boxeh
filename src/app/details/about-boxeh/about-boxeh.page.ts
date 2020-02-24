import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared-module/shared-services/auth.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../shared-module/shared-services/alert-service';
import { Utils } from '../../shared-module/utils/constants';
import { Error } from '../../shared-module/models/Error';
import { LoginResponse } from '../../shared-module/models/LoginResponse';

@Component({
  selector: 'app-about-boxeh',
  templateUrl: './about-boxeh.page.html',
  styleUrls: ['./about-boxeh.page.scss'],
})
export class AboutBoxehPage implements OnInit {
  data: any = [];

  constructor(private auth: AuthService , private nav: NavController , public alertService: AlertService) { }

  ngOnInit() {
    this.ourStoryData();
  }

  ourStoryData() {
    this.auth.ourStory().subscribe((response: any) => {
      this.data = response;
      console.log(this.data)
      // if (response.code === 200) {
      //   this.alertService.dismissLoading();
      //   this.nav.navigateRoot(['/home']);
      //   this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
      // } else {
      //   this.alertService.dismissLoading();
      //   this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
      // }
    })
  }
}
