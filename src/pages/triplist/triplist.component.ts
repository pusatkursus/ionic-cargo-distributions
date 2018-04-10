import { Utility } from './../../app/utility';
import { Component, ViewChild, ElementRef, OnInit, Output,EventEmitter ,NgZone  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../app/auth.service';
import { NavController ,AlertController } from 'ionic-angular';
import { SkulistComponent } from '../skulist/skulist.component';
import { PodComponent } from '../pod/pod.component';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'triplist',
  templateUrl: './triplist.component.html',
  styleUrls: []
})

export class TriplistComponent implements OnInit {
  @Output() triplistdata  = new EventEmitter<string>();
  @Output() vehicledata  = new EventEmitter();
  
  tripName: string = "";
  tripList = {};
  vehicleTripId;
  hasTripStarted = false;
  consignee;
  vehicleTripStatus;
  tripended = false;
  positionwatch ; 
  locationTracker ;
  tripNavigator = [];

  constructor(private http: HttpClient, private auth: AuthService, public navCtrl: NavController, 
    private nativeStorage: NativeStorage,private alertCtrl: AlertController ,
    public geolocation: Geolocation,public zone :NgZone,
    private launchNavigator: LaunchNavigator ,public utility : Utility
    ) { }

  ngOnInit(): void {
    this.getData();
  }

  // this function used for navigate another page like sque page
  squeroot(pickupRequestId, consignee,consno) {
    this.navCtrl.push(SkulistComponent, { pickupRequestId: pickupRequestId, consignee: consignee ,consigneeno:consno });
  }
  startTrip() {
    let userId = this.auth.getUserId();

    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/update_vehicleTrip?mobileTripProcessFlag=1&vehicleTripId=' + this.vehicleTripId + '&status=' + (this.hasTripStarted ? 3 : 2) + '&loggedInUserId=' + userId, { headers: this.auth.getRequestHeaders() }).subscribe((data) => {
          if(data['status'] = "success"){
            this.hasTripStarted = !this.hasTripStarted;
              if (this.hasTripStarted) {
                alert("Trip has started!");
                this.getData();
              }
              else
               {
                alert("Trip Ended");
                this.getData(); 
               }
        }
        else
        {
          alert("unable to stop trip")
        }

    }, err => {
      if (this.hasTripStarted)
        alert("Error In Starting the trip!");
      else
        alert("Error In Ending the trip!");
    }
    )
  }

  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  unsuccessful(pickupRequestVehicleTripId) {

let alert = this.alertCtrl.create({
  title: 'Reson For Cancel ? ',
  inputs: [
    {
      id: 'reson',
      name: 'reson',
      placeholder: 'Reson',
      type: 'text'
    }
  ],
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: data => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Ok',
      handler: data => {
        if (data.reson) {
          let userId = this.auth.getUserId();
          let str = {
            pickupRequestVehicleTripId: pickupRequestVehicleTripId,
            loggedInUserId: userId,
            attemptedDate: new Date().toISOString().split("T")[0].split("-").join('/'),
            attemptedTime: new Date().toTimeString().split(":").splice(0, 2).join(":"),
            remarks: data.reson,
            latitude :this.auth.getLat().lat,
            longitude :this.auth.getLat().log,
            unsuccessfullType: 2
          }
            
          if (this.vehicleTripStatus == 1) this.startTrip();
          this.http.post(this.auth.getRemoteUrl() + '/cargo/api/hub/unsuccessfull_consignments', str, { headers: this.auth.getRequestJSONHeaders() }).subscribe((data) => {
            console.log("##### sucessfullydeleted");
            
            console.log(data);
            
          }, err => {
            // alert("Error in marking the consignment as unsuccessfull!");
            console.log(err);
            console.log("errror from the ok cancel ");
          }
          )
           
            } else {
            console.log("invalid user name password");
            return false;
        }
      }
    }
  ]
});
alert.present();

  }



  pod(pickupRequestVehicleTripId,trip) {
    let userId = this.auth.getUserId();

    this.nativeStorage.setItem('pickupRequestTripId', pickupRequestVehicleTripId)
      .then(() => console.log('Stored pickuprestid Data!'),
      error => console.log('Error storing pickup request id', error));

    this.navCtrl.push(PodComponent,{pickupRequestVehicleTripId:pickupRequestVehicleTripId,triplistinfo:trip,vehicletripId:this.vehicleTripId});

/*
    let str =
      {
        proofOfDeliveryInput: JSON.stringify({
          pickup_request_vehicle_trip_id: pickupRequestVehicleTripId,
          delivered_to_person: 'xyz',
          user_id: userId,
          delivered_date: new Date().toISOString().split("T")[0].split("-").join('/'),
          delivered_time: new Date().toTimeString().split(":").splice(0, 2).join(":"),
          comment: ''
        })
      }

    if (this.vehicleTripStatus == 1) this.startTrip();
    this.http.post(this.auth.getRemoteUrl() + '/cargo/api/create_proofOfDelivery', this.getFormUrlEncoded(str), { headers: this.auth.getRequestHeaders() }).subscribe((data) => {
      console.log(data);
      alert("Proof of Delivery Created!");
    }, err => {
      alert("Error in creating Proof of Delivery");
    }
    )*/
  }

  getData() {
    this.utility.showloading();
    let userId = this.auth.getUserId();

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('vehicleTripId', '119');
    urlSearchParams.append('loggedInUserId', '13');
   
    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/retrieve_vehicleTripDriverAssigned?driverId=' + userId, { headers: this.auth.getRequestHeaders() }).subscribe((data) => {
      this.vehicleTripId = data['message'].vehicleTripId;
      
      console.log(data);
      console.log("&&&&&&&&&&&&&&");

      this.vehicleTripStatus = data['message'].vehicleTripStatus;
      this.currentLocation();
      this.vehicledata.emit({vehicleNo:data['message'].vehicleNo, model: data['message'].vehicleModelName})
      this.hasTripStarted = this.vehicleTripStatus == 2;
      this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/retrieve_tripsheet?vehicleTripId=' + this.vehicleTripId + '&loggedInUserId=' + userId, { headers: this.auth.getRequestHeaders() }).subscribe((data) => {
        this.tripList = data;
        // this.tripNavigator.push(this.tripList);
        this.triplistdata.emit(data['message']);
        this.utility.hideloading();
      }, err => {  
        // alert("Error in getting triplist");
        console.log("Error in getting triplist");
        this.utility.hideloading();
      })
    })
  }

  currentLocation(){
    let data ={};
    this.geolocation.getCurrentPosition().then((resp) => {
       data ={
         lat :resp.coords.latitude,
         log : resp.coords.longitude
        } 
        this.auth.setlog(data);
        let options = {
          frequency: 3000,
          enableHighAccuracy: true
        }; 
        this.positionwatch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
          console.log(position);
          // Run update inside of Angular's zone
          this.zone.run(() => {
            data  = {
              lat :position.coords.latitude,
              log : position.coords.longitude
            } 
          });
          this.auth.setlog(data);
        });
  }).catch((error) => {
     alert(error);
  });
  }


  newone(lat,log){
    if (lat && log) {
        this.launchNavigator.navigate([lat, log])
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
    }else{
      console.log("not latitude and lagite fund")
    }
  }
}





