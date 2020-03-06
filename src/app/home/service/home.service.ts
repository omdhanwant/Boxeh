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
  constructor(private http: HttpClient) { }

  get HomeDataState() {
    return this.homeDataState;
  }

  getHomeData() {
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-home.php?type=` + time.getTime())
      .pipe(
        map((response: Home) => {
          this.homeDataState.next(response);
          return response;
        }));
  }
}
