import { Contact } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../shared-module/shared-services/alert-service';
import { Utils } from '../../shared-module/utils/constants';
import { Error } from '../../shared-module/models/Error';
import { LoginResponse } from '../../shared-module/models/LoginResponse';
import { Router, ActivatedRoute } from '@angular/router';

interface ContactResponse {
  into: string,
  status: string,
  message: string
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  loading = false;
  constructor(
    private contact: Contact,
    private nav: NavController,
    private route: ActivatedRoute,
    public alertService: AlertService) {

  }

  ngOnInit() {
  }

  contactForm(form: NgForm) {
    if (form.valid) {
      this.alertService.presentLoading('Please Wait...');
      const fistname = form.control.get('first-name').value;
      const lastname = form.control.get('last-name').value;
      const phone = form.control.get('phone-no').value;
      const email = form.control.get('email').value;
      const address = form.control.get('address-1').value;
      const city = form.control.get('city').value;
      const comment = form.control.get('comment').value;

      const fd = new FormData();
      fd.append('first-name', fistname);
      fd.append('last-name', lastname);
      fd.append('phone-no', phone);
      fd.append('email', email);
      fd.append('address-1', address);
      fd.append('city', city);
      fd.append('comment', comment);

      this.loading = true;
      this.contact.submitForm(fd).subscribe((response: ContactResponse) => {
        if (response.status === 'mail_sent') {
          form.reset();
          // this.alertService.dismissLoading();
          this.loading = false;
          this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
          this.nav.navigateRoot([returnUrl]);
        } else {
          // this.alertService.dismissLoading();
          this.loading = false;
          this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
        }
      } ,(error) => {
        this.loading = false;
        this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
      });

    } else {
      this.alertService.dismissLoading();
      this.alertService.presentAlert(Utils.ERROR, 'Enter valid information!', [Utils.OK]);
    }
  }


}
