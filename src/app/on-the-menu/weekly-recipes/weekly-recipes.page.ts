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
  loading = false;

  constructor(private service: HomeService, private alertService: AlertService, public authService: AuthService) {}
  ngOnInit() {
  }

  initData(event?) {
    this.langSubscription =  this.authService.$currentLanguage.subscribe(languageState => {
      
      if (this.service.currentPageLanguage !== languageState) {
        this.service.currentPageLanguage = languageState
        // this.alertService.presentLoading('Please wait...');
        this.loading = true;
        this.service.refreshState();
  
      } 
      if (this.service.WeeklyReceipeDataState) {
        this.weeklyReceipeData = this.service.WeeklyReceipeDataState;
      } else  {
        this.subscription = this.service.getWeeklyReceipe(languageState).subscribe(home => {
          if (home.code === 200) {
    
            if(event) {
              event.target.complete();
            }
            this.weeklyReceipeData = home;
            this.segment = this.weeklyReceipeData.data.section_week_recipes.single_recipe_content[0 + 1].tab_pane
            this.recipeSegment = this.weeklyReceipeData.data.section_week_recipes.single_recipe_content[0].tablist[0][0].id
            this.dismissLoader();
          } else {
            this.alertService.presentAlert(Utils.ERROR, home.message, [Utils.OK]);
            this.dismissLoader();
          }
        } ,(error) => {
          this.dismissLoader();
          this.alertService.presentAlert(Utils.ERROR, Utils.ERROR_MESSAGE, [Utils.OK]);
        });
      }
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
    this.service.refreshState(); // refresh state
    // this.alertService.presentLoading('Please wait...');
    this.loading = true;
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
    if (this.langSubscription) this.langSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
   }
}
