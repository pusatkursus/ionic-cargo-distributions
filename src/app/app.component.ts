import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginComponent } from '../pages/login/login.component';
import { TriplistComponent } from '../pages/triplist/triplist.component';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = LoginComponent;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,nativeStorage : NativeStorage) {
    console.log(nativeStorage);
    let accessToken ;
    // nativeStorage.setItem('accessToken',"hello");
    nativeStorage.getItem('accessToken').then(
      data => {accessToken = data
        this.rootPage =  accessToken ? TriplistComponent : LoginComponent;
      },
      err => console.log(err)
    );

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

