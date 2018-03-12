import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthService } from './auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginComponent;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private auth: AuthService) {
    let accessToken =this.auth.getToken();
    if(accessToken != "null"){
      this.rootPage = HomeComponent;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      statusBar.overlaysWebView(false);
       // set status bar to color
       statusBar.backgroundColorByHexString('#a9c9ff');
    });
  }
}


