import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NavParams} from 'ionic-angular';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-skulist',
  templateUrl: './skulist.component.html',
  styleUrls: []
})

export class SkulistComponent implements OnInit {

  public pickupRequestId;
  public consignee;
  skuItems = {list:[
]};

  constructor(private http: HttpClient, public navParams: NavParams,  private auth: AuthService) {
    this.pickupRequestId = this.navParams.get('pickupRequestId');
    this.consignee = this.navParams.get('consignee');
   }

  ngOnInit() {

    this.http.get(this.auth.getRemoteUrl()+'/cargo/api/retrieve_pickupRequestSkuItems?pickupRequestId='+this.pickupRequestId+'&loggedInUserId=18',{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
    this.skuItems['list'] = data["message"]["sku_items"];

     }
     
    )
/*
    
  */ }

}
