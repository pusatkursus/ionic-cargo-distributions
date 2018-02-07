import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClient,HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {TransityInterceptor} from './transity.interceptor';
import { AuthService } from './auth.service';
import { LoginComponent } from '../pages/login/login.component';
import { TriplistComponent } from '../pages/triplist/triplist.component';
import { ItabsComponent } from '../pages/ionic/itabs/itabs.component';
import { LogoutComponent } from '../pages/logout/logout.component'
import { MapComponent } from '../pages/map/map.component';
import { Geolocation } from '@ionic-native/geolocation';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureComponent } from '../pages/signature/signature.component'
import {Camera} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    TriplistComponent,
    LoginComponent,
    ItabsComponent,
    LogoutComponent,
    MapComponent,
    SignatureComponent
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   LoginComponent,
   TriplistComponent,
   ItabsComponent,
   LogoutComponent,
   MapComponent,
   SignatureComponent

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    File,
    NativeStorage,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},{
      provide : HTTP_INTERCEPTORS,
      useClass : TransityInterceptor,
      multi : true
    },{
      provide : AuthService,
      useClass : AuthService,
      deps : []
    }
  ],
})
export class AppModule {}
