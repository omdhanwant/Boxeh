import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userResponse } from '../../checkout/model/userResponse';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../shared-module/shared-services/alert-service';
import { Utils } from '../../shared-module/utils/constants';
import { Service } from './service.service';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})

export class EditAddressPage{
  loading = false;
  subscription: Subscription;
  userDetails: any;
  userResponse: userResponse;
  user: any = {
    first_name:null,
    last_name:null,
    address_1:null,
    address_2:null,
    city:null,
    state:null,
    postcode:null,
    country:null,
    email:null,
    username:null,
    password:null,
    phone:null,
    delivery_date:null,
    daypart:null,
    customer_note:null,
  };

  constructor(
    private nav: NavController,
    public alertService: AlertService,
    private service: Service,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if(localStorage.getItem('userDetails')){
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      console.log(this.userDetails);
      this.user.first_name = this.userDetails.first_name;
      this.user.last_name = this.userDetails.last_name;
      this.user.email = this.userDetails.email;
      this.getUserData(this.userDetails.id);
    }else{
      this.userDetails = null;
      this.userResponse = null;
    }
  }

  getUserData(userID) {
    const form = new FormData();
    form.append('id', userID);
    this.loading = true;
    this.subscription = this.service.getUserData(form).subscribe(userRes => {
      if (userRes.code === 200) {
        this.userResponse = userRes;

        if(this.userResponse || this.userResponse !== null){
          console.log(this.userResponse);
          this.user = {
            first_name:this.userResponse.data.first_name,
            last_name:this.userResponse.data.last_name,
            company:this.userResponse.data.billing_company,
            address_1:this.userResponse.data.billing_address_1,
            address_2:this.userResponse.data.billing_address_2,
            city:this.userResponse.data.billing_city,
            state:this.userResponse.data.billing_state,
            postcode:this.userResponse.data.billing_postcode,
            country:this.userResponse.data.billing_country,
            email:this.userResponse.data.user_email,
            phone:this.userResponse.data.billing_phone
          };
        }
        this.loading = false;
      } else {
        this.alertService.presentAlert(Utils.ERROR, userRes.message, [Utils.OK]);
        this.loading = false;
      }
    }, (error) => {
      this.loading = false;
      this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
    });
  }
 
 

  ionViewDidLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.alertService.presentAlert(Utils.SUCCESS , 'Successfully logged out!' , [Utils.OK]);
    this.nav.navigateBack('/home');
    localStorage.clear();
  }

}
