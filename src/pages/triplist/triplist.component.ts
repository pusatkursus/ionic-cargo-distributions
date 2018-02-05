import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../app/auth.service';
import { NavController } from 'ionic-angular';
import { ItabsComponent } from '../ionic/itabs/itabs.component';
import { PopoverController } from 'ionic-angular';
import {LogoutComponent} from '../logout/logout.component';

declare var google: any;
@Component({
  selector: 'app-triplist',
  templateUrl: './triplist.component.html',
  styleUrls: []
})

export class TriplistComponent implements OnInit {


  private componentToDisplay: number = 1;  // this is used for display google map and triplist flag
  @ViewChild('map') mapRef: ElementRef;

  tripName: string = "hello";
  tripList = {};
  vehicleTripId;
  hasTripStarted = false;
  vehicleNo;
  model;
  consignee;
  vehicleTripStatus;

  constructor(private http: HttpClient, private auth: AuthService, public navCtrl: NavController,public popoverCtrl: PopoverController) { }

  ngOnInit(): void {
    this.getData();
    // this.DisplayMap();  
  }

  // this is used for display triplist and google map dependupon the flag  number = 1;
  setComponent(componentNumber: number): void {
    this.componentToDisplay = componentNumber;
  }




  // this function used for navigate another page like sque page
  squeroot(pickupRequestId,consignee) {
    this.navCtrl.push(ItabsComponent, { pickupRequestId: pickupRequestId , consignee : consignee});
  }
  startTrip() {
    let userId = this.auth.getUserId();

    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/update_vehicleTrip?vehicleTripId=' + this.vehicleTripId + '&status=' + (this.hasTripStarted ? 3 : 2) + '&loggedInUserId=' + userId,{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
      console.log(data);
      this.hasTripStarted = !this.hasTripStarted;
      if (this.hasTripStarted) {
        alert("Trip has started!");
      }
      else {
        alert("Trip Ended");
      }
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

  unsuccessful(pickupRequestVehicleTripId){
    let userId = this.auth.getUserId();
    let str ={
      pickupRequestVehicleTripId: pickupRequestVehicleTripId,
        loggedInUserId: userId,
        attemptedDate: new Date().toISOString().split("T")[0].split("-").join('/'),
        attemptedTime: new Date().toTimeString().split(":").splice(0,2).join(":"),
        remarks: '',
        unsuccessfullType : 2
      }
      this.http.post(this.auth.getRemoteUrl() + '/cargo/api/hub/unsuccessfull_consignments', JSON.stringify(str),{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
    console.log(data);
    this.hasTripStarted = !this.hasTripStarted;
    if (this.hasTripStarted) {
      alert("Consignment has been marked as unsuccessfull!");
    }
    else {
      alert("Error in marking the consignment as unsuccessfull!");
    }
  }
  )
  }


  pod(pickupRequestVehicleTripId) {
    let userId = this.auth.getUserId();
 //  let formData: FormData = new FormData(); 
 /*   let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('pickup_request_vehicle_trip_assignment', pickupRequestVehicleTripId);
    urlSearchParams.append('delivered_to_person', '');
    urlSearchParams.append('user_id', userId);
    urlSearchParams.append('delivered_date', new Date().toLocaleDateString("EN"));
    urlSearchParams.append('delivered_time', ""+new Date().getTime());
    urlSearchParams.append('comment', '');
    let proofOfDeliveryInput = new URLSearchParams();
    proofOfDeliveryInput.append('proofOfDeliveryInput',urlSearchParams.toString());
  */  let str =
      {
        proofOfDeliveryInput: JSON.stringify({
          pickup_request_vehicle_trip_id: pickupRequestVehicleTripId,
          delivered_to_person: 'xyz',
          user_id: userId,
          delivered_date: new Date().toISOString().split("T")[0].split("-").join('/'),
          delivered_time: new Date().toTimeString().split(":").splice(0,2).join(":"),
          comment: ''
        })
      }
    this.http.post(this.auth.getRemoteUrl() + '/cargo/api/create_proofOfDelivery', this.getFormUrlEncoded(str),{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
      console.log(data);
      this.hasTripStarted = !this.hasTripStarted;
      if (this.hasTripStarted) {
        alert("Proof of Delivery Created!");
      }
      else {
        alert("Error in creating Proof of Delivery");
      }
    }
    )
  }

  getData() {
    let userId = this.auth.getUserId();

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('vehicleTripId', '119');
    urlSearchParams.append('loggedInUserId', '13');
   /* var data = { message: 197 };
    this.vehicleTripId = data['message'];
    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/retrieve_tripsheet?vehicleTripId=' + data['message'] + '&loggedInUserId=' + userId).subscribe((data) => {
      console.log(data);
      this.tripList = data;
    }
    )*/
    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/retrieve_vehicleTripDriverAssigned?driverId=' + userId,{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
      this.vehicleTripId = data['message'].vehicleTripId;
      this.vehicleNo = data['message'].vehicleNo;
      this.model = data['message'].vehicleModelName;
      this.vehicleTripStatus = data['message'].vehicleTripStatus;
      this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/retrieve_tripsheet?vehicleTripId=' + this.vehicleTripId + '&loggedInUserId=' + userId,{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
        console.log(data);
        this.tripList = data;
      }
      )
    }

    )
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(LogoutComponent);
    popover.present({
      ev: myEvent
    });
  }

  DisplayMap() {

    const location = new google.maps.LatLng(13.0005618, 80.2478447);

    const options = {
      center: location,
      zoom: 10,
      streetViewControl: false,
    };
    const map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, map);
  }

  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    });
  }
}