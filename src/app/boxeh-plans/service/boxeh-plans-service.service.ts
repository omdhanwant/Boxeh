import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class BoxehPlansServiceService {
  private boxehPlanDataState: BehaviorSubject<BoxehPlans> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }


  get BoxehPlanDataState() {
    return this.boxehPlanDataState.value;
  }

  refreshState() {
    this.boxehPlanDataState.next(null);
  }

  getBoxehPlans() {
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-boxeh_plans.php?type=` + time.getTime())
      .pipe(
        map((response: BoxehPlans) => {
          this.boxehPlanDataState.next(response)
          return response;
        }));
  }

  getProductDetails(language, id) {
    const time = new Date();
    let fd = new FormData();
    fd.append('lang', language);
    fd.append('id',id);
    return this.http.post(`${environment.hostUrl}/boxeh/apis/get_single_product.php?&type=${time.getTime()}`, fd)
      .pipe(
        map((response: Product) => {
          return response;
        }));
  }
}
