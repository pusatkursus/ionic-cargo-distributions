import { Utility } from './../../app/utility';
import { Component, OnInit , AfterViewInit,NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams} from '@angular/http';
import { AuthService } from '../../app/auth.service';
import { HomeComponent} from '../home/home.component';
import { ToastController ,AlertController ,NavController,Platform} from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [  ]
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
  };

  session_data :any;
  gpsStatus_of = true;
  stauts_id_destroy ;

  constructor(private http: HttpClient, private auth: AuthService,public navCtrl: NavController,public toastCtrl: ToastController,
    public alertCtrl :AlertController,public platform: Platform,private diagnostic: Diagnostic, public zone : NgZone, public utility :Utility
  ) { }

  
  ngOnInit() {}

  ionViewWillEnter(){
    this.gpsstauts_check();
  }

  gpsstauts_check(){
   this.stauts_id_destroy =  Observable.interval(1000 * 1).subscribe(x => {
     console.log("this is checking destroy function");
    
    this.diagnostic.isLocationEnabled().then(
      (isAvailable) => {
        this.zone.run(() => {
          if(isAvailable == true){
            this.auth.setGpsStatus(1);
            this.gpsStatus_of = isAvailable;
            console.log(this.auth.getGpsStatus()); 
          }else{
            this.gpsStatus_of = isAvailable;
            this.auth.setGpsStatus(0);
            console.log(this.auth.getGpsStatus()); 
          }
        });
      }
    );
  }); 
  console.log(this.stauts_id_destroy);
 }


  login(usercreds) {

    this.auth.resetLStorage();
    this.utility.showloading();
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', usercreds.username);
    urlSearchParams.append('password', usercreds.password);
    urlSearchParams.append('grant_type','password');
    urlSearchParams.append('client_id','my-trusted-client');
    
    this.http.post(this.auth.getRemoteUrl()+'/cargo/oauth/token',
    urlSearchParams.toString(),{headers : this.auth.getLoginHeaders()}).subscribe((data) => {
    this.auth.setToken(data);

    this.http.get(this.auth.getRemoteUrl()+'/cargo/api/home?username='+usercreds.username,{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
      this.auth.setUserId(data['message']['user_id']);
      console.log(data);
      this.create_userdevice_session();
      this.newupdationofStaus();

    // this is new session based login 
    //  var data_new =   {
    //     "deviceInstanceId" : this.auth.getDeviceinstaceid(),
    //     "gcmDeviceToken" : "GCM4321",
    //     "applicationId" : "2",
    //     "gpsStatus" : "1",
    //     "loggedInUserId" : this.auth.getUserId()
    //     }

    //   console.log("session serviece"+ data_new);
    //   this.http.post(this.auth.getRemoteUrl()+'/cargo/api/create_userDeviceSession',data_new,{headers:this.auth.getRequestJSONHeaders()})
    //   .subscribe((data)=>{

    //  },
    //   err =>{
    //     console.log(err);
    //    }
    // );  
    // this.navCtrl.push(HomeComponent).then(()=>{
    //   const index = this.navCtrl.getActive().index;
    //   this.navCtrl.remove(0, index);
    // })
    
    })

  },
    (err) => {
      this.utility.hideloading();
      let toast = this.toastCtrl.create({
        message: 'UserName or password is wrong',
        duration: 3000
      });
      toast.present();
      console.log("this is new errors ####### "+ err)
    }
  )}

  create_userdevice_session(){

    var data_new =   {
      "deviceInstanceId" : this.auth.getDeviceinstaceid(),
      "gcmDeviceToken" : "GCM4321",
      "applicationId" : "2",
      "gpsStatus" : this.auth.getGpsStatus(),
      "loggedInUserId" : this.auth.getUserId()
      }
      
      // var data_new =   {
      //   "deviceInstanceId" : '2455sd45f54sdf56f6d',
      //   "gcmDeviceToken" : "GCM4321",
      //   "applicationId" : "2",
      //   "gpsStatus" :'1',
      //   "loggedInUserId" : this.auth.getUserId()
      //   }
  
    this.http.post(this.auth.getRemoteUrl()+'/cargo/api/create_userDeviceSession',data_new,{headers:this.auth.getRequestJSONHeaders()})
    .subscribe((data)=>{
      console.log(data);
      console.log(typeof(data));
      this.session_data = data;
      console.log(this.session_data);
      this.utility.hideloading();
      this.geterrordata();
    },
    err =>{
      console.log(err);
      this.utility.hideloading();
     }
  );  
  }



geterrordata(){

        let gotohome = true ;
        if(this.session_data['status'] == 'success')
          {
            this.auth.setSessionid(this.session_data['message'])
            console.log(this.session_data['message']);
            console.log("sucess fully get session id");
          }

          if(this.session_data['status'] == 'error')
          {
            let arrObj = [];
            arrObj  = this.session_data['message'];
            let dummy =  arrObj.find( item => item.error);
              if(dummy.parameter == 1 || dummy.parameter == 2 ){

              // let message = 'User is already logged in. Press YES to continue with current session, NO to create new session ?';
              //   console.log(dummy.error);
              // this.alertBox(message,dummy.error,dummy.parameter);
               this.logout()
                this.create_userdevice_session();
              }

              // if(dummy.parameter == 2){
              //   // console.log(dummy.error);
              //   // let message = 'another user is already logged in press YES to continue, NO to exit ?';
              //   // console.log(dummy.error);
              //   //      this.alertBox(message,dummy.error,dummy.parameter);
            
              //     this.logout();
              //     this.create_userdevice_session();
              // }

              if(dummy.parameter == 3){
                gotohome = false;
                console.log(dummy.error);
                let message = 'driver can not login more than one device, press YES to login using any other user id, NO exit ?';
                console.log(dummy.error);
                     this.alertBox(message,dummy.error,dummy.parameter);
              }
          }

            if(gotohome){
              this.navCtrl.push(HomeComponent).then(()=>{
                const index = this.navCtrl.getActive().index;
                this.navCtrl.remove(0, index);
                this.newdestory();
            })
        }
}

  newdestory(){
    console.log(this.stauts_id_destroy);
    console.log("this is ngdestory is destoryed the ");
    if (this.stauts_id_destroy) {
      clearInterval(this.stauts_id_destroy);
      console.log("this is inside destroyed the function");
    }
  }


  alertBox(titlename,err,param){
    let alert = this.alertCtrl.create({
      title: titlename,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
            // call the service of logout  
            // if(param == 1){
            //   this.logout()
            //   this.create_userdevice_session();
            // }
            // if(param == 2){
            //   this.platform.exitApp();
            // }

            if(param == 3){
              this.platform.exitApp();
            }
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // call the service of retrieve_user device 

            // if(param == 1){
            //   this.reterieve_user_device();
            // }
            // if(param == 2){
            //   this.logout();
            //   this.create_userdevice_session();
            // }
            if(param == 3){
              this.auth.removeToken();
              this.navCtrl.push(LoginComponent);
            }
          }
        }
      ]
    });
    alert.present();
  }

  reterieve_user_device(){

      this.http.get(this.auth.getRemoteUrl+'cargo/api/retrieve_userDeviceSessionId?deviceInstanceId=' +this.auth.getDeviceinstaceid()+ '&loggedInUserId=' + this.auth.getUserId(), { headers: this.auth.getRequestHeaders() })
      .subscribe((data)=>{
        console.log("data is arrived in the reterieve_user_device");
        console.log(data);
        this.auth.setSessionid(data['message'])
        },err =>
       {
         console.log(err);
       }
    )
  }

  newupdationofStaus(){
    var dummyvalue = 1;
    // 5 * 1000 = 5seconds
    Observable.interval(1000 * 10).subscribe(x => {
      this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
        if(isAvailable == true){
            this.auth.setGpsStatus(1)
            if(this.auth.getGpsStatus() != dummyvalue){
              this.update_user_deviceGps();
              dummyvalue = 1
              console.log('*is available inside if');
            }
            console.log('*Is available? ' + isAvailable);
       }
     else
      {
        console.log('*not available');
        this.auth.setGpsStatus(0);
        if( this.auth.getGpsStatus() != dummyvalue ){
          this.update_user_deviceGps();
          console.log('*not available inside');
            dummyvalue = 0;
        }
      }
     }).catch( (e) => {
         console.log(e);
         console.log(JSON.stringify(e));
       });
    });
  }

  update_user_deviceGps(){
    
    console.log(this.auth.getGpsStatus());
    console.log(this.auth.getSessionid());

    this.http.get(this.auth.getRemoteUrl+'cargo/api/update_userDeviceGpsStatus?userDeviceSessionId=' +this.auth.getSessionid()+'&gpsStatus='+this.auth.getGpsStatus()+'&loggedInUserId=' + this.auth.getUserId(), { headers: this.auth.getRequestHeaders() })
    .subscribe((data)=>{
      console.log("data is arrived in the reterieve_user_device")
      console.log(data)
      },err =>
     {
       console.log(err);
     }
  )
}

logout(){
    console.log(this.auth.getSessionid());
    console.log(this.auth.getDeviceinstaceid());

    let sessionId; 
    let deviceInstanceId;

    if(this.auth.getSessionid() && this.auth.getDeviceinstaceid()){
        sessionId = this.auth.getSessionid();
        deviceInstanceId = null;
      }
    else{
        sessionId = null;
        deviceInstanceId = this.auth.getDeviceinstaceid();
     }

  this.http.get(this.auth.getRemoteUrl+'cargo/api/update_userDeviceSessionLogout?userDeviceSessionId='+sessionId+'&deviceInstanceId='+deviceInstanceId+'&loggedInUserId=' + this.auth.getUserId(), { headers: this.auth.getRequestHeaders() })
    .subscribe((data)=>{
      console.log("logout successfully ");
      console.log(data);
      },err =>
     {
       console.log(err);
     }
  )
}



}



