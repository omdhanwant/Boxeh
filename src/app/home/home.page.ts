import { Component } from '@angular/core';
import { HomeService } from './service/home.service';
import { AlertService } from '../shared-module/shared-services/alert-service';
import { Subscription } from 'rxjs';
import { Utils } from '../shared-module/utils/constants';
import { AuthService } from '../shared-module/shared-services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  homeData: Home = null;
  subscription: Subscription;
  segment
  recipeSegment

  constructor(private service: HomeService, private alertService: AlertService, public authService: AuthService) {}

  ionViewWillEnter() {
    if (!this.service.HomeDataState.value) {
      this.alertService.presentLoading('Please wait...');
    }
    
  }

  ngOnInit() {
  }

  initData(event?) {
    if (this.service.HomeDataState.value) {
      this.homeData = this.service.HomeDataState.value;
    } else  {
      
      this.subscription = this.service.getHomeData().subscribe(home => {
        if (home.code === 200) {
  
          if(event) {
            event.target.complete();
          }
          this.homeData = home;
          this.segment = this.homeData.data.section_week_recipes.single_recipe_content[0].tab_pane
          this.recipeSegment = this.homeData.data.section_week_recipes.single_recipe_content[0].tablist[0][0].id
          this.alertService.dismissLoading();
        } else {
          this.alertService.presentAlert(Utils.ERROR, home.message, [Utils.OK]);
          this.alertService.dismissLoading();
        }
      });
    }

  }

  ionViewDidEnter() {
    this.initData();
  }

  refresh(event) {
    this.service.HomeDataState.next(null); // refresh state
    this.alertService.presentLoading('Please wait...');
    this.initData(event);
  }

  
 
  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
   const index =  this.homeData.data.section_week_recipes.weeks_to_show.findIndex(weeks => weeks.name === ev.target.innerText);
    // this.segment = this.homeData.data.section_week_recipes.single_recipe_content[0].tab_pane
    if(index !== -1) {
      this.recipeSegment = this.homeData.data.section_week_recipes.single_recipe_content[index].tablist[0][0].id
    }
    
  }

  recipeSegmentChanged(event) {
    // console.log('Segment changed', event);
    
  }
}
