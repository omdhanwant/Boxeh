import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface ContactResponse {
  into: string,
  status: string,
  message: string
}
interface ContactRes{
    code: number,
    status: boolean,
    message: string,
    data: {
        page_head: {
            bg_cover: string,
            content: string,
        },
        contact: {
            address: string,
            email: string,
            phone_no_1: string,
            phone_no_2: string,
            map_location: {
                address: string,
                lat: string,
                lng: string,
            }
        }
    }
}

@Injectable({
  providedIn: 'root'
})
export class Contact {

  constructor(private http: HttpClient) { }

  submitForm(credentials) {
    // return this.http.post(`http://boxeh.net/boxeh/wp-json/contact-form-7/v1/contact-forms/229/feedback`, credentials)
    return this.http.post(`${environment.hostUrl}/boxeh/wp-json/contact-form-7/v1/contact-forms/229/feedback`, credentials)
      .pipe(map((response: ContactResponse) => {
        return response;
      }));
  }

  getContactusData(){
    const time = new Date();
    return this.http.get(`${environment.hostUrl}/boxeh/apis/page-contact.php?type=` + time.getTime())
      .pipe(
        map((response: ContactRes) => {
          return response;
        }));
  }

}
