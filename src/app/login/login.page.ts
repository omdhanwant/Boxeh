import { Component } from '@angular/core';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private auth: AuthService , private route: Router , public alertController: AlertController) { }

  login(form: NgForm) {
    if (form.valid) {
      const username = form.control.get('username').value;
      const password = form.control.get('password').value;
      const fd = new FormData();
      fd.append('email', username);
      fd.append('password', password);
      this.auth.login(fd).subscribe(response => {
        form.reset();
        this.route.navigate(['/home']);
        this.presentAlert('Successfully logged in!');
      }, error => {
        this.presentAlert('Something went wrong!');
        throw error;
      });
    } else {
      this.presentAlert('Enter valid username and password!');
    }
  }


  async presentAlert(alertMessage) {
    const alert = await this.alertController.create({
      header: 'Login Error',
      subHeader: '',
      message: alertMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

}
