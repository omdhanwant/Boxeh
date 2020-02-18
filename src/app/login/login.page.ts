import { Component } from '@angular/core';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { Utils } from '../shared-module/utils/constants';
import { Error } from '../shared-module/models/Error';
import { LoginResponse } from '../shared-module/models/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private auth: AuthService , private nav: NavController , public alertService: AlertService) { }

  login(form: NgForm) {
    this.alertService.presentLoading('Please Wait...');
    if (form.valid) {
      // const username = form.control.get('username').value;
      // const password = form.control.get('password').value;
      // const fd = new FormData();
      // fd.append('email', username);
      // fd.append('password', password);

      console.log(form.value);
      this.auth.login(form.value).subscribe((response: LoginResponse) => {
      if (response.code === 200) {
        form.reset();
        this.alertService.dismissLoading();
        this.nav.navigateRoot(['/home']);
        this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
      } else {
        this.alertService.dismissLoading();
        this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
      }



        // }, error => {
        //   this.alertService.dismissLoading();
        //   this.alertService.presentAlert(Utils.ERROR, 'Unable to fetch User', [Utils.OK]);
        //   throw error;
        // });

      }
      // , (error: Error) => {
      //   this.alertService.dismissLoading();
      //   this.alertService.presentAlert(Utils.ERROR, error.message, [Utils.OK]);
      //   throw error;
      // }
      );

    } else {
      this.alertService.dismissLoading();
      this.alertService.presentAlert(Utils.ERROR, 'Enter valid username and password!', [Utils.OK]);
    }
  }

}
