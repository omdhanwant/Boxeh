import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private oursStoryDataState: BehaviorSubject<OurStory> = new BehaviorSubject(null);
  public currentPageLanguage: string = ''
  constructor(private http: HttpClient) { }

  get OursStoryDataState() {
    return this.oursStoryDataState.value;
  }

  refreshState() {
    this.oursStoryDataState.next(null);
  }

  // getOurStory() {
  //   const time = new Date();
  //   return this.http.get(`${environment.hostUrl}/boxeh/apis/page-our_story.php?type=` + time.getTime())
  //     .pipe(
  //       map((response: OurStory) => {
  //         console.log(response);
  //         return response;
  //       }));
  // }

  getOurStory(language) {
    const data = {lang: language};
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/page-our_story.php?type=` + time.getTime(), data)
      .pipe(
        map((response: OurStory) => {
          this.oursStoryDataState.next(response);
          return response;
        }));
  }
}
