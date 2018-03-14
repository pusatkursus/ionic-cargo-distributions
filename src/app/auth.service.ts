import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams} from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';

const STORAGE_KEY = 'accesstoken';
const USER_ID = '';

@Injectable()
export class AuthService {
  isAuthenticated: boolean = false;
  userId;
  windowHandle;
  ourcode;
  accesstoken = "null";
  contentType;
  remoteUrl = "http://localhost:8080";
  lstorage;
  
  constructor(public storage: NativeStorage) {
    this.lstorage = storage? storage : localStorage; 
    if(this.lstorage.getItem(STORAGE_KEY)==null)
      this.lstorage.setItem(STORAGE_KEY,"null");
  }

  setToken(data){
    this.lstorage.setItem(STORAGE_KEY, "Bearer "+ data.access_token);
  }

  removeToken(){
    this.lstorage.setItem(STORAGE_KEY, null);
  }

  getUserId(){
    return this.lstorage.getItem(USER_ID);
  }

  getToken(){
    return this.lstorage.getItem(STORAGE_KEY);
  }

  setUserId (userId){
    this.lstorage.setItem(USER_ID, userId);
  }

  /*
  setToken(data){
    this.accesstoken = "Bearer " +data.access_token;
  }

  removeToken(){
    this.accesstoken = null;
   }

   getToken (){
    return this.accesstoken;
  }
*/
  getLoginHeaders(){
    let header = new HttpHeaders();
    let client_id = "my-trusted-client";
    let client_secret = 'secret';
    var basicheader = btoa(client_id + ':' + client_secret);
    header.set('Authorization','Basic '+basicheader);
    return header;
  }

  getRequestHeaders(){
    this.setContentType('application/x-www-form-urlencoded');
    let header = new HttpHeaders();
    header.append('Content-Type',this.getContentType());
    header.append('Authorization',this.getToken());
    return header;
  }

  getRequestJSONHeaders(){
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    header.append('Authorization',this.getToken());
    this.setContentType('application/json');
    return header;
  }

  getRemoteUrl(){
    return this.remoteUrl;
  }

  setContentType(data){
    this.contentType = data;
  }
  
  getContentType(){
    return this.contentType;
  }

}