import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../app/auth.service';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { ItabsComponent } from '../ionic/itabs/itabs.component';


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

  constructor(private http: HttpClient, private auth: AuthService, public navCtrl: NavController) { }

  ngOnInit(): void {
    this.getData();
    // this.DisplayMap();  
  }

  // this is used for display triplist and google map dependupon the flag  number = 1;

  setComponent(componentNumber: number): void {
    this.componentToDisplay = componentNumber;
  }

  // this function used for navigate another page like sque page
  squeroot(pickupRequestId) {
    this.navCtrl.push(ItabsComponent, { pickupRequestId: pickupRequestId });
  }
  startTrip() {
    let userId = this.auth.getUserId();

    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/update_vehicleTrip?vehicleTripId=' + this.vehicleTripId + '&status=' + (this.hasTripStarted ? 3 : 2) + '&loggedInUserId=' + userId).subscribe((data) => {
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
        attemptedDate: new Date().toLocaleDateString("EN"),
        attemptedTime: new Date().getTime(),
        remarks: '',
        unsuccessfullType : 2
      }
      this.http.post(this.auth.getRemoteUrl() + '/cargo/api/hub/unsuccessfull_consignments', JSON.stringify(str)).subscribe((data) => {
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
          pickup_request_vehicle_trip_assignment: pickupRequestVehicleTripId,
          delivered_to_person: 'xyz',
          user_id: userId,
          delivered_date: new Date().toLocaleDateString("EN"),
          delivered_time: new Date().getTime(),
          comment: ''
        })
      }
    this.http.post(this.auth.getRemoteUrl() + '/cargo/api/create_proofOfDelivery', this.getFormUrlEncoded(str)).subscribe((data) => {
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
    var data = { message: 197 };
    this.vehicleTripId = data['message'];
    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/retrieve_tripsheet?vehicleTripId=' + data['message'] + '&loggedInUserId=' + userId).subscribe((data) => {
      console.log(data);
      this.tripList = data;
    }
    )
    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/retrieve_vehicleTripDriverAssigned?driverId=' + userId).subscribe((data) => {
      this.vehicleTripId = data['message'];
      this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/retrieve_tripsheet?vehicleTripId=' + data['message'] + '&loggedInUserId=' + userId).subscribe((data) => {
        console.log(data);
        this.tripList = data;
      }
      )
    }

    )
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