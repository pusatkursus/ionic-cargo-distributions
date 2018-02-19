import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../app/auth.service';
import { NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { LogoutComponent } from '../logout/logout.component';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements AfterViewInit {

  googllatlong: any = [];
  triplistdata: any = [];
  vehicleNo;
  model;
  ismenu = false;
  ismap = true;
 
  constructor(private http: HttpClient, private auth: AuthService, public navCtrl: NavController, public popoverCtrl: PopoverController ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
  }

  receiveTriplistData($event) {
    this.triplistdata = $event;
  }

  receiveVehicleData($event) {
    this.vehicleNo = $event.vehicleNo;
    this.model = $event.model;
  }

  menuclick() {
    this.ismenu = false;
    this.ismap = true;
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
  }

}
