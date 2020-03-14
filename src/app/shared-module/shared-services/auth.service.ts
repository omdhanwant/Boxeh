import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { User } from '../models/User';
import { LoginResponse } from '../models/LoginResponse';
import { DomSanitizer } from '@angular/platform-browser';

const USER = 'User';
const TOKEN = 'Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public LANGUAGE = 'un';
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  private languageState: BehaviorSubject<string> = new BehaviorSubject('un');
  // private token: BehaviorSubject<string> = new BehaviorSubject(null);
  public currentUser: Observable<User> = this.currentUserSubject.asObservable();
  public $currentLanguage: Observable<string> = this.languageState.asObservable();

  constructor(private http: HttpClient, private storage: Storage , private _sanitizer: DomSanitizer) {
      this.getLoggedInUser().then(user => this.currentUserSubject.next(user ? JSON.parse(user) : ''));
      // this.getToken().then(token => this.token.next(token) );
  }

//   public get credential(): string {
//     return this.token.value;
// }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  public set currentUserValue(user) {
       this.currentUserSubject.next(user);
}

public get currentLanguageValue() {
  return this.languageState.value;
}

public set currentLanguage(language) {
  this.LANGUAGE = this.languageState.value;
  this.languageState.next(language);
}

public get currentLanguage(): string {
  return this.languageState.value;
}


registerUser(userCredentials) {
  return this.http.post(`${environment.hostUrl}/boxeh/apis/create_customer.php`, userCredentials)
  .pipe(map((response: LoginResponse) => {
      return response;
  }));
}

  login(credentials) {
      return this.http.post(`${environment.hostUrl}/boxeh/apis/login.php`, credentials)
          .pipe(map((response: LoginResponse) => {
              // sessionStorage.setItem(TOKEN, loginResponse.success.token);
              // this.storage.set(TOKEN, response.data);
              // this.token.next(JSON.stringify(response.data));
                  this.storage.set(USER, JSON.stringify(response.data));
                  this.currentUserSubject.next(response.data);
                  return response;
          }));
  }

  // getUser() {
  //   return this.http.get(`${environment.hostUrl}/boxeh/api/${environment.version}/getUser`).pipe(
  //     map((response: {success: User}) => {
  //       // sessionStorage.setItem(USER, JSON.stringify(response.success));
  //       this.storage.set(USER, JSON.stringify(response.success));
  //       this.currentUserSubject.next(response.success);
  //     })
  //   );
  // }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value ? true : false;
  }

  logout() {
      // this.token.next(null);
      this.currentUserSubject.next(null);
      this.storage.set(TOKEN, '');
      this.storage.set(USER , '');
  }

  getLoggedInUser() {
   return this.storage.get(USER) as Promise<string>;
    // return sessionStorage.getItem(USER) ? sessionStorage.getItem(USER) : null;
}

getBackground(image) {
  return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0)),url(${image})`);
}

// getToken() {
//    return this.storage.get(TOKEN) as Promise<string>;
//     // return sessionStorage.getItem(TOKEN) ? sessionStorage.getItem(TOKEN) : '';
// }
}
