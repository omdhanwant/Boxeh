import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { BoxehPlansServiceService } from './service/boxeh-plans-service.service';
import { Subscription } from 'rxjs';
import { Utils } from '../shared-module/utils/constants';
import { AuthService } from '../shared-module/shared-services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-boxeh-plans',
  templateUrl: './boxeh-plans.page.html',
  styleUrls: ['./boxeh-plans.page.scss'],
})
export class BoxehPlansPage implements OnInit {
  data: BoxehPlans = null;
  subscription : Subscription;
  loading = false;
  routeToId: string;
  constructor(private service : BoxehPlansServiceService,
    private alertService: AlertService, 
    public authService: AuthService,
    private nav: NavController) { 
      this.routeToId = '';
    }


  ionViewWillEnter() {
    if (!this.service.BoxehPlanDataState) {
      this.loading = true;
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
          this.loading = false;
        } else {
          this.alertService.presentAlert(Utils.ERROR, boxehPlans.message, [Utils.OK]);
          this.loading = false;
        }
      } ,(error) => {
        this.loading = false;
        this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
      });
    }
  }

  ionViewDidEnter() {
    this.initData();
  }

  refresh(event) {
    this.service.refreshState();
    this.loading = true;
    this.initData(event);
  }

  setRouteToId(event) {
    // this.nav.navigateForward(['/boxeh-plans/product-details'], {queryParams: { id: event.target.value }})
      this.routeToId = event.target.value;
  }

  routeToPath() {
    this.nav.navigateForward(['/boxeh-plans/product-details'], {queryParams: { id: this.routeToId }})
  }
}
