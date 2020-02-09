import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { Utils } from '../shared-module/utils/constants';

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
      const name = form.control.get('name').value;
      const email = form.control.get('email').value;
      const password = form.control.get('password').value;
      const cPassword = form.control.get('c_password').value;

      const fd = new FormData();
      fd.append('name', name);
      fd.append('email', email);
      fd.append('password', password);
      fd.append('c_password', cPassword);

      this.auth.registerUser(fd).subscribe(response => {
        form.reset();
        this.nav.navigateBack(['/login']);
        this.alertService.presentAlert(Utils.SUCCESS, 'Successfully registered!', [Utils.OK]);
      }, error => {
        if (error.status === 500) {
          this.alertService.presentAlert(Utils.ERROR , 'User already registered!', [Utils.OK]);
        } else {
          this.alertService.presentAlert(Utils.ERROR , 'Something went wrong!', [Utils.OK]);
        }
        throw error.message;
      });
    } else {
      this.alertService.presentAlert(Utils.ERROR , 'Enter valid details!', ['OK']);
    }
  }




}
