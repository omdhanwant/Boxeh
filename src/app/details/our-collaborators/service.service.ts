import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared-module/models/User';

@Injectable({
  providedIn: 'root'
})
export class Service {

  private collaboratorsDataState: BehaviorSubject<OurCollaborators> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }


  get CollaboratorsDataState() {
    return this.collaboratorsDataState.value;
  }

  refreshState() {
    this.collaboratorsDataState.next(null);
  }

  getCollborators(language) {
    console.log(language)
    const data = {lang: language};
    const time = new Date();
    return this.http.post(`${environment.hostUrl}/boxeh/apis/page-our_collabrator.php?type=` + time.getTime(), data)
      .pipe(
        map((response: OurCollaborators) => {
          this.collaboratorsDataState.next(response);
          return response;
        }));
  }
}
