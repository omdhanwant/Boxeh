import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared-module/shared-services/auth.service';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../shared-module/shared-services/alert-service';
import { Utils } from '../../shared-module/utils/constants';
import { Error } from '../../shared-module/models/Error';
import { LoginResponse } from '../../shared-module/models/LoginResponse';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(
    private auth: AuthService,
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService) {

  }

  ngOnInit() {
  }

  contactForm(form: NgForm) {
    console.log(form);
    // this.alertService.presentLoading('Please Wait...');
    // if (form.valid) {

    //   this.auth.login(form.value).subscribe((response: LoginResponse) => {
    //     if (response.code === 200) {
    //       form.reset();
    //       this.alertService.dismissLoading();
    //       this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
    //       const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    //       this.nav.navigateRoot([returnUrl]);
    //     } else {
    //       this.alertService.dismissLoading();
    //       this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
    //     }
    //   }
    //   );

    // } else {
    //   this.alertService.dismissLoading();
    //   this.alertService.presentAlert(Utils.ERROR, 'Enter valid username and password!', [Utils.OK]);
    // }
  }


}
