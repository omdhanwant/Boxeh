import { Component } from '@angular/core';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { Utils } from '../shared-module/utils/constants';

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
      const username = form.control.get('username').value;
      const password = form.control.get('password').value;
      const fd = new FormData();
      fd.append('email', username);
      fd.append('password', password);

      this.auth.login(fd).subscribe(response => {

        this.auth.getUser().subscribe(user => {
          form.reset();
          this.alertService.dismissLoading();
          this.nav.navigateRoot(['/home']);
          this.alertService.presentAlert(Utils.SUCCESS, 'Successfully logged in!', [Utils.OK]);

        }, error => {
          this.alertService.dismissLoading();
          this.alertService.presentAlert(Utils.ERROR, 'Unable to fetch User', [Utils.OK]);
          throw error;
        });

      }, error => {
        this.alertService.dismissLoading();
        this.alertService.presentAlert(Utils.ERROR, 'Username or password is not valid', [Utils.OK]);
        throw error;
      });

    } else {
      this.alertService.dismissLoading();
      this.alertService.presentAlert(Utils.ERROR, 'Enter valid username and password!', [Utils.OK]);
    }
  }

}
