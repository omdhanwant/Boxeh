import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { User } from '../models/User';

const USER = 'User';
const TOKEN = 'Token';
interface LoginResponse {
  success: {
    token: string
  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  private token: BehaviorSubject<string> = new BehaviorSubject(null);
  public currentUser: Observable<User> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private storage: Storage ) {
      this.getLoggedInUser().then(user => this.currentUserSubject.next(JSON.parse(user)) );
      this.getToken().then(token => this.token.next(token) );
  }

  public get credential(): string {
    return this.token.value;
}

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  public set currentUserValue(user) {
       this.currentUserSubject.next(user);
}


registerUser(fd: FormData) {
  return this.http.post(`${environment.hostUrl}/boxeh/api/${environment.version}/register`, fd)
  .pipe(map((response: LoginResponse) => {
      return response;
  }));
}

  login(fd: FormData) {
      return this.http.post(`${environment.hostUrl}/boxeh/api/${environment.version}/login`, fd)
          .pipe(map((response: LoginResponse) => {
              // sessionStorage.setItem(TOKEN, loginResponse.success.token);
              this.storage.set(TOKEN, response.success.token);
              this.token.next(response.success.token);
              return response;
          }));
  }

  getUser() {
    return this.http.get(`${environment.hostUrl}/boxeh/api/${environment.version}/getUser`).pipe(
      map((response: {success: User}) => {
        // sessionStorage.setItem(USER, JSON.stringify(response.success));
        this.storage.set(USER, JSON.stringify(response.success));
        this.currentUserSubject.next(response.success);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.token ? true : false;
  }

  logout() {
      this.token.next(null);
      this.currentUserSubject.next(null);
      this.storage.set(TOKEN, '');
      this.storage.set(USER , '');
  }

  getLoggedInUser() {
   return this.storage.get(USER) as Promise<string>;
    // return sessionStorage.getItem(USER) ? sessionStorage.getItem(USER) : null;
}

getToken() {
   return this.storage.get(TOKEN) as Promise<string>;
    // return sessionStorage.getItem(TOKEN) ? sessionStorage.getItem(TOKEN) : '';
}
}
