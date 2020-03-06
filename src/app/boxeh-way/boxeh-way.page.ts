import { Component, OnInit } from '@angular/core';
import { Service } from './service.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { Utils } from 'src/app/shared-module/utils/constants';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../shared-module/shared-services/auth.service';

@Component({
  selector: 'app-boxeh-way',
  templateUrl: './boxeh-way.page.html',
  styleUrls: ['./boxeh-way.page.scss'],
})
export class BoxehWayPage implements OnInit {
  boxehWhy: BoxehWhy = null;
  subs: Subscription;
  toggle1:boolean;
  toggle2:boolean;
  toggle3:boolean;
  constructor(private service: Service, private alertService: AlertService, public authService: AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (!this.service.BoxehWayDataState) {
      this.alertService.presentLoading('Please wait...');
    }
  }


  initData(event?) {
    if (this.service.BoxehWayDataState) {

      this.boxehWhy = this.service.BoxehWayDataState;

    } else  {

      this.subs = this.service.getBoxehWhy().subscribe(boxehWay => {
        if (boxehWay.code === 200) {
  
          if(event) {
            event.target.complete();
          }
          this.boxehWhy = boxehWay;
          this.alertService.dismissLoading();
        } else {
          this.alertService.presentAlert(Utils.ERROR, boxehWay.message, [Utils.OK]);
          this.alertService.dismissLoading();
        }
      });
    }
  }


  ionViewDidEnter() {
      this.initData()
  }

  refresh(event) {
    this.service.refreshState();
    this.alertService.presentLoading('Please wait...');
    this.initData(event);
  }


  ionViewWillLeave() {
    this.subs.unsubscribe();
  }

  toggleSection1(){
    this.toggle1 = !this.toggle1
  }
  toggleSection2(){
    this.toggle2 = !this.toggle2
  }
  toggleSection3(){
    this.toggle3 = !this.toggle3
  }

}
