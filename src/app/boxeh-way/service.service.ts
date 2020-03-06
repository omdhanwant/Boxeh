import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private boxehWayDataState: BehaviorSubject<BoxehWhy> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  get BoxehWayDataState() {
    return this.boxehWayDataState.value;
  }

  refreshState() {
    this.boxehWayDataState.next(null);
  }


  getBoxehWhy() {
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-the_boxeh_way.php?type=` + time.getTime())
      .pipe(
        map((response: BoxehWhy) => {
          this.boxehWayDataState.next(response)
          return response;
        }));
  }
}
