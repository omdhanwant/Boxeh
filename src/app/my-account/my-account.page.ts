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
  user: User = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    id: ''
  };
  // first_name: string;
  // last_name: string;
  // username: string;
  // email: string;
  constructor(private auth: AuthService, private alertService: AlertService, private nav: NavController) { }

  ionViewDidEnter() {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
    });
  }
  
  saveUser(form: NgForm) {
    this.loading = true;
    if (form.valid && this.user) {


      const updatedUser: User  = {
        first_name: form.control.get('first_name').value,
        last_name: form.control.get('last_name').value,
        username: form.control.get('username').value,
        email: form.control.get('email').value,
        id: this.user.id,
      }
    
        this.auth.getUser(updatedUser).subscribe((response: any) => {
          if (response.code === 200) {
            this.loading = false;
            this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
          } else {
            this.loading = false;
            this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
          }
  
        } ,(error) => {
          this.loading = false;
          this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
        }
        );

        // this.auth.token == form.value.old_password &&
        if( (form.value.conf_password == form.value.new_password)) {
          const updatedPassword  = {
            old_password: form.value.old_password,
            new_password: form.value.new_password,
            user_id: this.user.id
          }

          this.updatePassword(form , updatedPassword);
        } else {
          this.loading = false;
          this.alertService.presentAlert(Utils.ERROR , 'Confirmed password is not matching!', ['OK']);
        }
        

    } else {
      this.loading = false;
      this.alertService.presentAlert(Utils.ERROR , 'Enter valid details!', ['OK']);
    }
  }

  

  updatePassword(form: NgForm, updatedPassword) {

      this.auth.updatePassword(updatedPassword).subscribe((response: any) => {
        if (response.code === 200) {
          this.loading = false;
          this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
        } else {
          this.loading = false;
          this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
        }

      } ,(error) => {
        this.loading = false;
        this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
      });
    } 
  

}
