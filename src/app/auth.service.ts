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