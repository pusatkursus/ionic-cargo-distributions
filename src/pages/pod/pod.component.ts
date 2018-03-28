import { LogoutComponent } from './../logout/logout.component';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController ,PopoverController} from 'ionic-angular';
import { SignatureComponent } from '../signature/signature.component';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from "@ionic-native/file";
import { LoadingController, Loading, ToastController } from "ionic-angular";
import { AuthService } from '../../app/auth.service';
import { HomeComponent } from '../home/home.component';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { FileUploader } from 'ng2-file-upload';
import * as domtoimage from 'dom-to-image';
import {FileUploaderCustom} from '../../app/fileuploadercustom'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-map',
  templateUrl: './pod.component.html',
  styleUrls: []
})
export class PodComponent implements AfterViewInit {
  @ViewChild("signatureImage22") signatureImageFile: any;
  public signatureImage: any;
  public pickupRequestVehicleTripId: any;
  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;
  hasTripStarted = false;
  deliverPerson;
  Comments;
  triplistdata;
  name ;
  consigneeName ;
  consigneePhoneNo;
  locationAddress;
  weightTonnage;
  vehicletripId ;
  

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController,
    private camera: Camera,
    private readonly loadingCtrl: LoadingController,
    private readonly file: File,
    private http: HttpClient,
    private auth: AuthService,
    private nativeStorage: NativeStorage,
    public uploader: FileUploaderCustom,
    public popoverCtrl: PopoverController
  ) {
    this.signatureImage = navParams.get('signatureImage');
    this.pickupRequestVehicleTripId = navParams.get('pickupRequestVehicleTripId');
    this.triplistdata = navParams.get('triplistinfo');
    this.Comments = navParams.get('Comments');
    this.deliverPerson = navParams.get('deliverperson');
    this.vehicletripId = navParams.get('vehicletripId');
    console.log(this.vehicletripId);
  }

  ngAfterViewInit() {

    this.newupdation();

    this.name = this.triplistdata.name ;
    this.consigneeName = this.triplistdata.consigneeName;
    this.consigneePhoneNo = this.triplistdata.consigneePhoneNo;
    this.locationAddress = this.triplistdata.locationAddress;
    this.weightTonnage = this.triplistdata.weightTonnage;
    
  
    this.uploader = new FileUploaderCustom({
      url: this.auth.getRemoteUrl() + '/cargo/api/create_proofOfDelivery',
      authToken: this.auth.getToken()
      //headers : [{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},{"Authorization": this.auth.getToken()}]
    });
    this.uploader.onBuildItemForm = (item, form) => {
      let userId = this.auth.getUserId();
      form.append("proofOfDeliveryInput", JSON.stringify({
        pickup_request_vehicle_trip_id: this.pickupRequestVehicleTripId,
        delivered_to_person: this.deliverPerson,
        user_id: userId,
        delivered_at_latitude : this.auth.getLat().lat, 
        delivered_at_longitude : this.auth.getLat().log,
        delivered_date: new Date().toISOString().split("T")[0].split("-").join('/'),
        delivered_time: new Date().toTimeString().split(":").splice(0, 2).join(":"),
        comment: this.Comments,
      }));
    };
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

  openSignatureModel() {
    setTimeout(() => {
      let modal = this.modalController.create(SignatureComponent, { pickupRequestVehicleTripId: this.pickupRequestVehicleTripId, triplist:this.triplistdata,deliverperson :this.deliverPerson,Comments:this.Comments,vehicletripId:this.vehicletripId });
      modal.present();
    }, 300);
  }
  
  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      targetWidth: 420,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: true
      
    }).then(imageData => {
      this.displayImage(imageData);
    }, error => {
      console.log(JSON.stringify(error));

    });
  }


  private displayImage(imgUri) {
    this.myPhoto = "data:image/JPEG;base64," + imgUri;
  }

  pod() {
    var firstImg,secondImg;
    if (this.signatureImage || this.myPhoto) {
      if(this.signatureImage){
        firstImg = {node : document.getElementById('signImage'),
                    alias : "signatureImage", 
                    name : 'signatureImage.jpg'};
        if(this.myPhoto)
          secondImg = {node : document.getElementById('myPhotoId'),
          alias : "photoImage",
          name : 'photoImage.jpg'};
      }
      else{
        firstImg = {node : document.getElementById('myPhotoId'),
        alias : "photoImage",
        name : 'photoImage.jpg'};
      }
      domtoimage.toBlob(firstImg.node)
        .then((blob) => {
          blob['name'] = firstImg.name;
          this.uploader.addToQueue([blob]);
          this.uploader.getNotUploadedItems()[0].alias = firstImg.alias;

          if (secondImg) {
            domtoimage.toBlob(secondImg.node)
              .then((blob) => {
                blob['name'] = secondImg.name;
                this.uploader.addToQueue([blob]);
                this.uploader.getNotUploadedItems()[1].alias = secondImg.alias;
                this.uploadCall();
              });
          } else {
            this.uploadCall();
          }
        });
    }
    // });
  }



  uploadCall() {
    this.uploader.uploadAllFiles();
    this.hasTripStarted = !this.hasTripStarted;
    if (this.hasTripStarted) {
      alert("Proof of Delivery Created!");
       this.newupdation();
       this.navCtrl.push(HomeComponent);
    }
    else {
      alert("Error in creating Proof of Delivery");
    }
  }

  newupdation(){
    Observable.interval(2000 * 60).subscribe(x => {
      this.updateVehicleLocationxxx();
    });
  }

  updateVehicleLocationxxx(){
    let str ={
      vehicleTripId :this.vehicletripId,
      loggedInUserId : this.auth.getUserId(),
      vehicleLocationLatitude : this.auth.getLat().lat,
      vehicleLocationLongitude: this.auth.getLat().log
    }

    this.http.post(this.auth.getRemoteUrl() + '/cargo/api/update_vehicleLocation', str, { headers: this.auth.getRequestJSONHeaders() }).subscribe((data) => {
      console.log(data);
    }, err => {
      console.log(err);
    }
    )
  }


 

  // updateVehicleLocation(){
  //   let str ={
  //     vehicleTripId :this.vehicletripId,
  //     loggedInUserId : this.auth.getUserId(),
  //     vehicleLocationLatitude : this.auth.getLat().lat,
  //     vehicleLocationLongitude: this.auth.getLat().log
  //   } 
  // Observable.timer(0, 120000)  // starting immediately, calling every 120seconds (or 2 minutes)
  // .switchMap(() => this.http.post(this.auth.getRemoteUrl() + '/cargo/api/update_vehicleLocation', str, { headers: this.auth.getRequestJSONHeaders() }))  
  // .subscribe(resp => {
  //   console.log(resp);
  //   },
  //   err => {
  //     console.log(err);
  //   }
  // )
  // }

  cancel() {
    this.navCtrl.push(HomeComponent);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(LogoutComponent);
    popover.present({
      ev: myEvent
    });
  }

}
