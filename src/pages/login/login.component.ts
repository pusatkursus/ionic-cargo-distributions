import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams} from '@angular/http';
import { AuthService } from '../../app/auth.service';
import {  NavController } from 'ionic-angular';
import { TriplistComponent} from '../triplist/triplist.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  user = {
    username: 'transity.ts@gmail.com',
    password: '123'
  };
  showSpinner: boolean = false;

  constructor(private http: HttpClient, private auth: AuthService,public navCtrl: NavController) { }

  ngOnInit() {
  }

  // login2(usercreds) {

  //   let userlogin = this.auth.login(usercreds);
  //     userlogin.then((res) => {
  //       if (res)
  //       this.router.navigate(['/triplist']);
  //     })
  // }

  login(usercreds) {
    this.showSpinner = true;
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', usercreds.username);
    urlSearchParams.append('password', usercreds.password);
    urlSearchParams.append('grant_type','password');
    urlSearchParams.append('client_id','my-trusted-client');

    this.http.post('/cargo/oauth/token',
    urlSearchParams.toString()).subscribe((data) => {
      this.auth.setToken(data);
      this.navCtrl.push(TriplistComponent);
      
     // this.router.navigate(['/triplist']);
      },
      (err) => {
        this.showSpinner = false;
       // this.snackBar.open("E-mail/password invaid", 'ok', {
        //  duration: 5000
        //});
        // console.log("this is new errors ####### "+ err)
      }
      )


  }

  


}
