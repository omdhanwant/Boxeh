import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { BoxehPlansServiceService } from './service/boxeh-plans-service.service';
import { Subscription } from 'rxjs';
import { Utils } from '../shared-module/utils/constants';
import { AuthService } from '../shared-module/shared-services/auth.service';

@Component({
  selector: 'app-boxeh-plans',
  templateUrl: './boxeh-plans.page.html',
  styleUrls: ['./boxeh-plans.page.scss'],
})
export class BoxehPlansPage implements OnInit {
  data: BoxehPlans = null;
  subscription : Subscription;
  constructor(private service : BoxehPlansServiceService,private alertService: AlertService, public authService: AuthService) { }


  ionViewWillEnter() {
    if (!this.service.BoxehPlanDataState) {
      this.alertService.presentLoading('Please wait...');
    }
  }

  ngOnInit() {
  }

  initData(event?) {
    if (this.service.BoxehPlanDataState) {

      this.data = this.service.BoxehPlanDataState;

    } else  {

      this.subscription = this.service.getBoxehPlans().subscribe(boxehPlans => {
        if (boxehPlans.code === 200) {
  
          if(event) {
            event.target.complete();
          }
          this.data = boxehPlans;
          this.alertService.dismissLoading();
        } else {
          this.alertService.presentAlert(Utils.ERROR, boxehPlans.message, [Utils.OK]);
          this.alertService.dismissLoading();
        }
      });
    }
  }

  ionViewDidEnter() {
    this.initData();
  }

  refresh(event) {
    this.service.refreshState();
    this.alertService.presentLoading('Please wait...');
    this.initData(event);
  }

}
