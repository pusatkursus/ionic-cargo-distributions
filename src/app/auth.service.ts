import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams} from '@angular/http';

@Injectable()
export class AuthService {
  isAuthenticated: boolean = false;
  userId;
  windowHandle;
  ourcode;
  accesstoken;
  remoteUrl = "http://localhost:8080";
  constructor(public http: HttpClient) { }

  setToken(data){
    this.accesstoken = "Bearer " +data.access_token;
  }

  getRemoteUrl(){
    return this.remoteUrl;
  }

  getToken (){
    return this.accesstoken;
  }

  setUserId (userId){
    this.userId = userId;
  }

  getUserId(){
    return this.userId;
  }

  login(user) {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', user.username);
    urlSearchParams.append('password', user.password);
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('client_id', 'my-trusted-client');

    return new Promise((resolve) => {
      this.http.post('http://35.154.80.6:8080/cargo/oauth/token',
        urlSearchParams.toString()).subscribe((data) => {
        }
        )
    })
  }
 
}
