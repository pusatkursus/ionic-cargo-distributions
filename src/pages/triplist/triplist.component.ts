import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../app/auth.service';
import { NavController } from 'ionic-angular';
import { ItabsComponent } from '../ionic/itabs/itabs.component';
import { PopoverController } from 'ionic-angular';
import { LogoutComponent } from '../logout/logout.component';
import { Geolocation } from '@ionic-native/geolocation';
import { MapComponent } from '../map/map.component';
import { NativeStorage } from '@ionic-native/native-storage';

declare var google: any;

@Component({
  selector: 'app-triplist',
  templateUrl: './triplist.component.html',
  styleUrls: []
})

export class TriplistComponent implements OnInit {


  private contentPlaceholder: ElementRef;

  @ViewChild('contentPlaceholder') set content(content: ElementRef) {
    this.contentPlaceholder = content;
  }

  tripName: string = "hello";
  tripList = {};
  vehicleTripId;
  googllatlong: any = [];
  hasTripStarted = false;
  vehicleNo;
  model;
  consignee;
  vehicleTripStatus;
  ismenu = false;
  ismap = true;
  map: any;
  constructor(private http: HttpClient, private auth: AuthService, public navCtrl: NavController, public popoverCtrl: PopoverController, public geolocation: Geolocation,
    private nativeStorage: NativeStorage, ) { }

  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit() {
    console.log(this.contentPlaceholder);
  }

  menuclick() {
    this.ismenu = false;
    this.ismap = true;
  }



  // this function used for navigate another page like sque page
  squeroot(pickupRequestId, consignee) {
    this.navCtrl.push(ItabsComponent, { pickupRequestId: pickupRequestId, consignee: consignee });
  }
  startTrip() {
    let userId = this.auth.getUserId();

    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/update_vehicleTrip?mobileTripProcessFlag=1&vehicleTripId=' + this.vehicleTripId + '&status=' + (this.hasTripStarted ? 3 : 2) + '&loggedInUserId=' + userId, { headers: this.auth.getRequestHeaders() }).subscribe((data) => {
      console.log(data);
      this.hasTripStarted = !this.hasTripStarted;
      if (this.hasTripStarted) {
        alert("Trip has started!");
      }
      else {
        alert("Trip Ended");
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
    let userId = this.auth.getUserId();
    let str = {
      pickupRequestVehicleTripId: pickupRequestVehicleTripId,
      loggedInUserId: userId,
      attemptedDate: new Date().toISOString().split("T")[0].split("-").join('/'),
      attemptedTime: new Date().toTimeString().split(":").splice(0, 2).join(":"),
      remarks: '',
      unsuccessfullType: 2
    }
    if (this.vehicleTripStatus == 1) this.startTrip();
    this.http.post(this.auth.getRemoteUrl() + '/cargo/api/hub/unsuccessfull_consignments', JSON.stringify(str), { headers: this.auth.getRequestHeaders() }).subscribe((data) => {
      console.log(data);
      alert("Consignment has been marked as unsuccessfull!");
    }, err => {
      alert("Error in marking the consignment as unsuccessfull!");
    }
    )
  }


  pod(pickupRequestVehicleTripId) {
    let userId = this.auth.getUserId();

    this.nativeStorage.setItem('pickupRequestTripId', pickupRequestVehicleTripId)
      .then(() => console.log('Stored pickuprestid Data!'),
      error => console.log('Error storing pickup request id', error));

    this.navCtrl.push(MapComponent);


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
    this.http.get(this.auth.getRemoteUrl() + '/cargo/api/retrieve_vehicleTripDriverAssigned?driverId=' + userId, { headers: this.auth.getRequestHeaders() }).subscribe((data) => {
      this.vehicleTripId = data['message'].vehicleTripId;
      this.vehicleNo = data['message'].vehicleNo;
      this.model = data['message'].vehicleModelName;
      this.vehicleTripStatus = data['message'].vehicleTripStatus;
      this.hasTripStarted = this.vehicleTripStatus == 2;
      this.http.get(this.auth.getRemoteUrl() + '/cargo/api/hub/retrieve_tripsheet?vehicleTripId=' + this.vehicleTripId + '&loggedInUserId=' + userId, { headers: this.auth.getRequestHeaders() }).subscribe((data) => {
        console.log(data);
        this.tripList = data;
        this.googllatlong = data['message'];
      }, err => {
        alert("Error in getting triplist");
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

    this.ismenu = true;
    this.ismap = false;
    setTimeout(() => {
      const location = new google.maps.LatLng(13.0005618, 80.2478447);

      const options = {
        center: location,
        zoom: 12,
        streetViewControl: false,
      };

      this.map = new google.maps.Map(this.contentPlaceholder.nativeElement, options);
      //this.addMarker(location, this.map);
      this.getMarkers();
      google.maps.event.trigger(this.map, 'resize');
    }, 1000)
  }

  getMarkers() {
    var infowindow = new google.maps.InfoWindow();

    var bounds = new google.maps.LatLngBounds();

    var marker, list = this.googllatlong;
    if (this.googllatlong.length > 0) {
      for (let i = 0; i < this.googllatlong.length; i++) {
        marker = this.addMarkersToMap(this.googllatlong[i]);
        bounds.extend(marker.getPosition());

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent("<div>" + list[i].consigneeName + " | " + list[i].consigneePhoneNo + "</div>" + list[i].locationAddress);
            infowindow.open(this.map, marker);
          }
        })(marker, i));
      }
    }
    this.map.setCenter(bounds.getCenter());
    this.map.fitBounds(bounds);
  }

  addMarkersToMap(triplist) {
    var position = new google.maps.LatLng(triplist.latitude, triplist.longitude);
    var triplistMarker = new google.maps.Marker({ position: position, title: triplist.name, map: this.map });
    triplistMarker.setMap(this.map);
    return triplistMarker;
  }

}