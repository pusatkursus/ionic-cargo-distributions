import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams} from '@angular/http';
import { AuthService } from '../../app/auth.service';
import {  NavController } from 'ionic-angular';
import { HomeComponent} from '../home/home.component';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [  ]
})
export class LoginComponent implements OnInit {

  user = {
    username: 'kmrkrsn@gmail.com',
    password: '456'
  };
  showSpinner: boolean = false;

  constructor(private http: HttpClient, private auth: AuthService,public navCtrl: NavController,public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  login(usercreds) {
    this.showSpinner = true;
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', usercreds.username);
    urlSearchParams.append('password', usercreds.password);
    urlSearchParams.append('grant_type','password');
    urlSearchParams.append('client_id','my-trusted-client');
    
    this.http.post(this.auth.getRemoteUrl()+'/cargo/oauth/token',
    urlSearchParams.toString(),{headers : this.auth.getLoginHeaders()}).subscribe((data) => {
      this.auth.setToken(data);

    this.http.get(this.auth.getRemoteUrl()+'/cargo/api/home?username='+usercreds.username,{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
      console.log(data);
      this.auth.setUserId(data['message']['user_id']);
      this.navCtrl.push(HomeComponent).then(()=>{
        const index = this.navCtrl.getActive().index;
        this.navCtrl.remove(0, index);
      })
    })
  },
    (err) => {
      let toast = this.toastCtrl.create({
        message: 'UserName or password is wrong',
        duration: 3000
      });
      toast.present();
      console.log("this is new errors ####### "+ err)
    }
  )}

  


}



