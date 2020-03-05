import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoxehPlansServiceService {

  constructor(private http: HttpClient) { }


  getBoxehPlans() {
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-boxeh_plans.php?type=` + time.getTime())
      .pipe(
        map((response: BoxehPlans) => {
          console.log(response);
          return response;
        }));
  }
}
