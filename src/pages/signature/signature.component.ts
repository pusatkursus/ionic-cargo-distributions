import { Component, OnInit,ViewChild } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { PodComponent } from '../pod/pod.component'

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: []
})
export class SignatureComponent implements OnInit {

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 420
  };
  public signatureImage : string;
  public pickupRequestVehicleTripId;
  public triplist ;
  public deliverperson ;
  public Comments ;
  vehicletripId ;
  constructor(public navCtrl: NavController,public navParams:NavParams) 
    { 
    this.pickupRequestVehicleTripId = navParams.get('pickupRequestVehicleTripId');
    this.triplist = navParams.get('triplist');
    this.Comments = navParams.get('Comments');
    this.deliverperson = navParams.get('deliverperson');
    this.vehicletripId = navParams.get('vehicletripId');
    
    }


  ngOnInit() { }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  drawCancel() {
    this.navCtrl.push(PodComponent,{pickupRequestVehicleTripId:this.pickupRequestVehicleTripId,triplistinfo:this.triplist,deliverperson :this.deliverperson,Comments:this.Comments, vehicletripId:this.vehicletripId});
  }

   drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.navCtrl.push(PodComponent, {signatureImage: this.signatureImage,pickupRequestVehicleTripId:this.pickupRequestVehicleTripId,triplistinfo:this.triplist, deliverperson :this.deliverperson, Comments:this.Comments,vehicletripId:this.vehicletripId});
  }

  drawClear() {
    this.signaturePad.clear();
  }

}
