import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  // styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient, public navCtrl: NavController, private auth: AuthService,public viewCtrl: ViewController) { }

  ngOnInit() {
    
  }

  close() {
    console.log(this.auth.getSessionid());
    console.log(this.auth.getDeviceinstaceid());

    let sessionId; 
    let loggedIn_userid;

    if( this.auth.getSessionid() && this.auth.getDeviceinstaceid()){
      sessionId = this.auth.getSessionid();
      loggedIn_userid = null;
      }
    else{
      sessionId = null;
      loggedIn_userid = this.auth.getDeviceinstaceid();
     }

    this.http.get(this.auth.getRemoteUrl+'cargo/api/update_userDeviceSessionLogout?userDeviceSessionId='+sessionId+'&deviceInstanceId='+this.auth.getDeviceinstaceid()+'&loggedInUserId=' + loggedIn_userid, { headers: this.auth.getRequestHeaders() })
    .subscribe((data)=>{
      console.log("logout successfully ");
      console.log(data);
      // this.auth.removeToken();
      // this.navCtrl.push(LoginComponent);
      },err =>
     {
       console.log(err);
     })

       this.auth.removeToken();
       this.navCtrl.push(LoginComponent);
       this.auth.setUserId(null);
    // this.viewCtrl.dismiss();
   
  }
}
