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
  remoteUrl = "http://35.154.80.6:8080";
  constructor(public http: HttpClient) { }

  setToken(data){
    this.accesstoken = "Bearer " +data.access_token;
  }

  removeToken(){
    this.accesstoken = null;
  }

  getLoginHeaders(){
    let header = new HttpHeaders();
    let client_id = "my-trusted-client";
    let client_secret = 'secret';
    var basicheader = btoa(client_id + ':' + client_secret);
    header.append('Authorization','Basic '+basicheader);
    return header;
  }

  getRequestHeaders(){
    let header = new HttpHeaders();
    header.append('Content-Type','application/x-www-form-urlencoded');
    header.append('Authorization',this.getToken());
    return header;
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

 
}