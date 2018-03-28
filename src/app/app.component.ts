import { Component } from '@angular/core';
import { Platform , AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginComponent } from '../pages/login/login.component';
import { HomeComponent } from '../pages/home/home.component';
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthService } from './auth.service';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginComponent;

  constructor(platform: Platform,
     statusBar: StatusBar,
     splashScreen: SplashScreen,
     private auth: AuthService ,
     private diagnostic: Diagnostic,
     private alertCtrl: AlertController,
     public geolocation: Geolocation
    ) {
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
       statusBar.backgroundColorByHexString('#488aff');


       this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
          if(isAvailable == true){
            console.log('Is available? ' + isAvailable);
          }
          else
          {
            console.log('not available');
            let alert = this.alertCtrl.create({
          title: 'GPS ACCESSING',
          message: 'can swith on The GPS?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                platform.exitApp() 
              }
            },
            {
              text: 'ok',
              handler: () => {
                console.log('ok clicked');
                this.diagnostic.switchToLocationSettings();

              }
            }
          ]
        });
        alert.present();
            
          }
      }).catch( (e) => {
        console.log(e);
        alert(JSON.stringify(e));
        });
    
    });

  }
}
        










       

    
      

      




