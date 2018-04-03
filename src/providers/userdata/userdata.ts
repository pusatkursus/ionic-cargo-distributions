import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the UserdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


const STORAGE_KEY = 'accesstoken';

@Injectable()
export class UserdataProvider {

  constructor(public storage: NativeStorage) { }

  setToken(data){
    this.storage.setItem(STORAGE_KEY, data.access_token);
  }

  removeToken(){
    this.storage.setItem(STORAGE_KEY, null);
  }

  getToken (){
    return this.storage.getItem(STORAGE_KEY);
  }
}
