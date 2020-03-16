import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/home/service/home.service';
import { AlertService } from 'src/app/shared-module/shared-services/alert-service';
import { AuthService } from 'src/app/shared-module/shared-services/auth.service';
import { Utils } from 'src/app/shared-module/utils/constants';

@Component({
  selector: 'app-weekly-recipes',
  templateUrl: './weekly-recipes.page.html',
  styleUrls: ['./weekly-recipes.page.scss'],
})
export class WeeklyRecipesPage implements OnInit { 
  weeklyReceipeData: Weekly = null;
  subscription: Subscription;
  langSubscription: Subscription;
  segment
  recipeSegment

  constructor(private service: HomeService, private alertService: AlertService, public authService: AuthService) {}

  ionViewWillEnter() {
    if (!this.service.WeeklyReceipeDataState) {
      this.alertService.presentLoading('Please wait...');
    }
  }

  ngOnInit() {
  }

  initData(event?) {
    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {

      if (this.authService.LANGUAGE !== languageState) {
        this.alertService.presentLoading('Please wait...');
        this.service.refreshState();
      } 
      
      if (this.service.WeeklyReceipeDataState) {
        this.weeklyReceipeData = this.service.WeeklyReceipeDataState;
      } else  {
        this.subscription = this.service.getWeeklyReceipe(this.authService.LANGUAGE).subscribe(home => {
          if (home.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.weeklyReceipeData = home;
            this.segment = this.weeklyReceipeData.data.section_week_recipes.single_recipe_content[0 + 1].tab_pane
            this.recipeSegment = this.weeklyReceipeData.data.section_week_recipes.single_recipe_content[0].tablist[0][0].id
            this.alertService.dismissLoading();
          } else {
            this.alertService.presentAlert(Utils.ERROR, home.message, [Utils.OK]);
            this.alertService.dismissLoading();
          }
        });
      }
    })

   
  }

  ionViewDidEnter() {
    this.initData();
  }

  refresh(event) {
    this.service.refreshState(); // refresh state
    this.alertService.presentLoading('Please wait...');
    this.initData(event);
  }

  
 
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
   const index =  this.weeklyReceipeData.data.section_week_recipes.weeks_to_show.findIndex(weeks => weeks.name === ev.target.innerText);
    // this.segment = this.weeklyReceipeData.data.section_week_recipes.single_recipe_content[0].tab_pane
    if(index !== -1) {
      this.recipeSegment = this.weeklyReceipeData.data.section_week_recipes.single_recipe_content[index].tablist[0][0].id
    }
    
  }

  recipeSegmentChanged(event) {
    console.log('Segment changed', event);
  }
  
  ionViewDidLeave(){
    this.langSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
