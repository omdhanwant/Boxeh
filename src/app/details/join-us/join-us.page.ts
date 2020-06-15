import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../shared-module/shared-services/auth.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
interface JoinUsResponse {
  into: string,
  status: string,
  message: string,
  invalidFields: [
      {
          into: string,
          message: string,
          idref: string,
      }
  ]
}
@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.page.html',
  styleUrls: ['./join-us.page.scss'],
})
export class JoinUsPage implements OnInit {
  user: any = {
    first_name:null,
    last_name:null,
    address_1:null,
    phone_no:null,
    city:null,
    email:null
  };

  JoinUs: JoinUs = null;
  countryCode:any = '962';
  subscription: Subscription;
  langSubscription: Subscription;
  file: any;
  loading = false;
  constructor(
    private service: Service, 
    public authService: AuthService, 
    private alertService: AlertService, 
    private _sanitizer: DomSanitizer,
    private nav: NavController,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
  }

  getBackground(image) {
      return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
  }
  
  initData(event?) {
    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {
      if (this.service.currentPageLanguage !== languageState) {
        this.service.currentPageLanguage = languageState
        this.loading = true;
        this.service.refreshState();
  
      } 

      if (this.service.JoinUsDataState) {
        this.JoinUs = this.service.JoinUsDataState;
      } else  {
        this.subscription = this.service.getJoinUs(languageState).subscribe(responseData => {
          if (responseData.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.JoinUs = responseData;
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, responseData.message, [Utils.OK]);
            this.dismissLoader();
          }
        });
      }

    } ,(error) => {
      this.dismissLoader();
      this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
    })
  }

  dismissLoader() {
    // setTimeout(() => {
    //   this.alertService.dismissLoading();
    // }, 100); 
    this.loading = false;
  }

  ionViewDidEnter() {
    this.initData();
  }


  refresh(event) {
    this.service.refreshState();
    this.loading = true;
    this.initData(event);
  }
  
  ionViewDidLeave(){
    if (this.langSubscription) this.langSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
   }

   //file upload
   fileChange(event: any) {
    // const filesList: FileList = event.target.files;
    const filesList = event.target.files[0]
    this.file = filesList;
    console.log("fileChange() -> filesList", filesList);
  }

   joinUsForm(form: NgForm) {
    //  console.log(form.value);
    if (form.valid) {
      this.loading = true;
      const fistname = form.control.get('first_name').value;
      const lastname = form.control.get('last_name').value;
      const phone = form.control.get('phone_no').value;
      const email = form.control.get('email').value;
      const address = form.control.get('address_1').value;
      const city = form.control.get('city').value;
     
      const fd = new FormData();
      fd.append('first-name', fistname);
      fd.append('last-name', lastname);
      fd.append('phone-no', this.countryCode+phone);
      fd.append('email', email);
      fd.append('address-1', address);
      fd.append('city', city);
      fd.append('cv', this.file);
      this.service.submitForm(fd).subscribe((response: JoinUsResponse) => {
        if (response.status === 'mail_sent') {
          form.reset();
          this.loading = false
          // this.alertService.dismissLoading();
          this.alertService.presentAlert(Utils.SUCCESS, response.message, [Utils.OK]);
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
          this.nav.navigateRoot([returnUrl]);
        } else {
          this.loading = false
          // this.alertService.dismissLoading();
          this.alertService.presentAlert(Utils.ERROR, response.message, [Utils.OK]);
        }
      } ,(error) => {
        // this.dismissLoader();
        this.loading = false
        this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
      });

    } else {
      // this.alertService.dismissLoading();
      this.alertService.presentAlert(Utils.ERROR, 'Enter valid information!', [Utils.OK]);
    }
  }

}
