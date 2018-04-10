import { LocationAccuracy } from '@ionic-native/location-accuracy';
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
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginComponent;
  gps;
  constructor(platform: Platform,
     statusBar: StatusBar,
     splashScreen: SplashScreen,
     private auth: AuthService ,
     private diagnostic: Diagnostic,
     private alertCtrl: AlertController,
     public geolocation: Geolocation,
     private uniqueDeviceID: UniqueDeviceID,
     private locationAccuracy: LocationAccuracy
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


       this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log("#####");
          console.log("this is from cargo distributions"+ uuid)
           this.auth.setDeviceinstaceid(uuid);
      }).catch((error: any) => console.log("this is from cargo distributions"+ error));

      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        console.log(canRequest);
        console.log("this is new update location permissions")
      
          if (canRequest) {
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() =>
            {
             console.log('Request successful')
            },
             error => {
               if(error){
                console.log('Error requesting location permissions', error)

                if (error.code !== this.locationAccuracy.ERROR_USER_DISAGREED) {
                      if (window.confirm("Failed to automatically set Location Mode. Would you like to switch to the Location Settings page and do this manually?")) {
                          this.diagnostic.switchToLocationSettings();
                            }
                      }
                }
              }
            );
          }else{
            console.log("Cannot request location accuracy , user cannot authorized");
             this.diagnostic.isLocationEnabled().then((isAvailable) => {
           if(isAvailable == true){
            this.auth.setGpsStatus(1)
            console.log('Is available? ' + isAvailable);
            }
          else
            {
             console.log('not available');
              let alert = this.alertCtrl.create({
              title: 'GPS ACCESSING',
              message: 'can swith on The GPS?',
              enableBackdropDismiss: false,
            buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                this.auth.setGpsStatus(0)
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
      }


        });

      
    
    });

  }
}
        










       

    
      

      




