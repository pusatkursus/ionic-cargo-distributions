import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpClient,HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {TransityInterceptor} from './transity.interceptor';
import {HomeComponent} from '../pages/home/home.component';
import { AuthService } from './auth.service';
import { LoginComponent } from '../pages/login/login.component';
import { TriplistComponent } from '../pages/triplist/triplist.component';
import { SkulistComponent } from '../pages/skulist/skulist.component';
import { TripmapComponent } from '../pages/tripmap/tripmap.component';
import { LogoutComponent } from '../pages/logout/logout.component'
import { PodComponent } from '../pages/pod/pod.component';
import { Geolocation } from '@ionic-native/geolocation';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureComponent } from '../pages/signature/signature.component'
import {Camera} from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { FileUploadModule} from 'ng2-file-upload';
import { FileUploader} from 'ng2-file-upload';
import { FileUploaderCustom } from './fileuploadercustom';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@NgModule({
  declarations: [
    MyApp,
    TriplistComponent,
    LoginComponent,
    SkulistComponent,
    LogoutComponent,
    PodComponent,
    SignatureComponent,
    HomeComponent,
    TripmapComponent
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    FileUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   LoginComponent,
   TriplistComponent,
   SkulistComponent,
   LogoutComponent,
   PodComponent,
   SignatureComponent,
   HomeComponent,
   TripmapComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    File,
    Diagnostic,
    LaunchNavigator,
    NativeStorage,
    {provide:FileUploader,useClass:FileUploader,deps:[]},
    {provide:FileUploaderCustom, useClass:FileUploaderCustom,deps:[]},
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
