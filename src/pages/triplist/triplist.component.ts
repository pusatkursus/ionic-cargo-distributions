import { Component,ViewChild,ElementRef, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../app/auth.service';
import {Observable} from 'rxjs/Observable';
import {  NavController } from 'ionic-angular';
import { ItabsComponent } from '../ionic/itabs/itabs.component';


declare var google: any;
@Component({
  selector: 'app-triplist',
  templateUrl: './triplist.component.html',
  styleUrls: []
})

export class TriplistComponent implements OnInit {


  private componentToDisplay: number = 1;  // this is used for display google map and triplist flag

  @ViewChild('map') mapRef:ElementRef;

  tripName: string = "hello";
  tripList ={};

  constructor(private http: HttpClient, private auth: AuthService,public navCtrl: NavController) { }

  ngOnInit(): void {
    this.getData();
   // this.DisplayMap();  
  }

  // this is used for display triplist and google map dependupon the flag  number = 1;

  setComponent(componentNumber: number): void {
    this.componentToDisplay = componentNumber;
  }

  // this function used for navigate another page like sque page
  squeroot(pickupRequestId){
    this.navCtrl.push(ItabsComponent,{pickupRequestId : pickupRequestId});
}

  getData() {
    let userId = this.auth.getUserId();
    
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('vehicleTripId', '119');
    urlSearchParams.append('loggedInUserId', '13');

    this.http.get(this.auth.getRemoteUrl()+'/cargo/api/retrieve_vehicleTripDriverAssigned?driverId='+userId+'&loggedInUserId=13').subscribe((data) => {
   // data = {message:{vehicleTripId:197}}
    this.http.get(this.auth.getRemoteUrl()+'/cargo/api/hub/retrieve_tripsheet?vehicleTripId='+data['message']['vehicleTripId']+'&loggedInUserId=13').subscribe((data) => {
      console.log(data);
      this.tripList = data;
     } 
     )
     }
     
    )
    }

  DisplayMap(){
    
         const location = new google.maps.LatLng(13.0005618,80.2478447);
    
         const options = {
            center:location,
            zoom:10,
            streetViewControl:false,
          };
            const map = new google.maps.Map(this.mapRef.nativeElement,options);
          this.addMarker(location,map);
      }
    
      addMarker(position,map) {
          return new google.maps.Marker({
            position,
            map
          });
        }
}