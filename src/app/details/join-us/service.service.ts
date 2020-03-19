import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface JoinUsResponse {
  into: string,
  status: string,
  message: string,
  invalidFields: [
      {
          into: string,
          message: string,
          idref: string,
      }
  ]
}
@Injectable({
  providedIn: 'root'
})
export class Service {

  private joinUsDataState: BehaviorSubject<JoinUs> = new BehaviorSubject(null);
  public currentPageLanguage: string = ''
  constructor(private http: HttpClient) { }


  get JoinUsDataState() {
    return this.joinUsDataState.value;
  }

  refreshState() {
    this.joinUsDataState.next(null);
  }

  getJoinUs(language) {
    console.log(language)
    const data = {lang: language};
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/page-join_us.php?type=` + time.getTime(), data)
      .pipe(
        map((response: JoinUs) => {
          this.joinUsDataState.next(response);
          return response;
        }));
  }

  submitForm(credentials) {
    return this.http.post(`${environment.hostUrl}/boxeh/wp-json/contact-form-7/v1/contact-forms/282/feedback`, credentials)
      .pipe(map((response: JoinUsResponse) => {
        return response;
      }));
  }

}
