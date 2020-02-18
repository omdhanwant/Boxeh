import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { Utils } from '../shared-module/utils/constants';
import { LoginResponse } from '../shared-module/models/LoginResponse';
import { Error } from '../shared-module/models/Error';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private auth: AuthService, private alertService: AlertService, private nav: NavController) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    if (form.valid) {
      // console.log(form.value);
      this.auth.registerUser(form.value).subscribe((response: LoginResponse) => {
        if (response.code === 200) {
          form.reset();
          this.nav.navigateBack(['/login']);
          this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
        } else {
          this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
        }

      }
      // , (error: Error) => {
      //     this.alertService.presentAlert(Utils.ERROR , error.message, [Utils.OK]);
      //     throw error.message;
      // }
      );
    } else {
      this.alertService.presentAlert(Utils.ERROR , 'Enter valid details!', ['OK']);
    }
  }




}
