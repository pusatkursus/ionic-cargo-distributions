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
    
       this.auth.removeToken();
       this.navCtrl.push(LoginComponent);
    // this.viewCtrl.dismiss();

  }

}
