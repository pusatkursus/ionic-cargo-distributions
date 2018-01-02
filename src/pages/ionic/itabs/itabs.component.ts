
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NavParams} from 'ionic-angular';
import { AuthService } from '../../../app/auth.service';
@Component({
  selector: 'app-itabs',
  templateUrl: './itabs.component.html',
  styleUrls: ['']
})
export class ItabsComponent implements OnInit {

  public pickupRequestId;
  skuItems = {list:[
]};

  constructor(private http: HttpClient, public navParams: NavParams,  private auth: AuthService) {
    this.pickupRequestId = this.navParams.get('pickupRequestId');
   }

  ngOnInit() {

    this.http.get(this.auth.getRemoteUrl()+'/cargo/api/retrieve_pickupRequestSkuItems?pickupRequestId='+this.pickupRequestId+'&loggedInUserId=18').subscribe((data) => {
    this.skuItems['list'] = data["message"]["sku_items"];

     }
     
    )
/*
    
  */ }

}
