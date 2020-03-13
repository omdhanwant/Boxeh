import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared-module/models/User';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private homeDataState: BehaviorSubject<Home> = new BehaviorSubject(null);
  private weeklyReceipeDataState: BehaviorSubject<Weekly> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  get HomeDataState() {
    return this.homeDataState.value;
  }

  get WeeklyReceipeDataState() {
    return this.weeklyReceipeDataState.value;
  }

  refreshState() {
    this.weeklyReceipeDataState.next(null);
    this.homeDataState.next(null);
  }

  getHomeData(language) {
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-home.php?lang=${language}&type=` + time.getTime())
      .pipe(
        map((response: Home) => {
          this.homeDataState.next(response);
          return response;
        }));
  }


  getHomeData2(language) {
    const data = {lang: language};
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/page-home.php?type=` + time.getTime(), data)
      .pipe(
        map((response: Home) => {
          this.homeDataState.next(response);
          return response;
        }));
  }


  getWeeklyReceipe(language) {
    const data = {lang: language};
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/page-weekly_recipes.php?type=` + time.getTime(), data)
      .pipe(
        map((response: Weekly) => {
          this.weeklyReceipeDataState.next(response);
          return response;
        }));
  }
}
