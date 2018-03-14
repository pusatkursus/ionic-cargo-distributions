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
  }

  ngAfterViewInit() {

    console.log("i am here");

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
      console.log(userId);

      form.append("proofOfDeliveryInput", JSON.stringify({
        pickup_request_vehicle_trip_id: this.pickupRequestVehicleTripId,
        delivered_to_person: this.deliverPerson,
        user_id: userId,
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
      let modal = this.modalController.create(SignatureComponent, { pickupRequestVehicleTripId: this.pickupRequestVehicleTripId, triplist:this.triplistdata,deliverperson :this.deliverPerson,Comments:this.Comments });
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
    var isSignImage = false;
    let blobArr = [] ;

    if (this.signatureImage && this.myPhoto) {
      
      isSignImage = true;
      let node = document.getElementById('signImage');
      domtoimage.toBlob(node)
        .then((blob) => {
          blob['name'] = 'signatureImage.jpg';
          blobArr.push(<File>blob);
          
          //  this.uploader.addToQueue([blob]);
          //  this.uploader.getNotUploadedItems()[0].alias = "signatureImage";
          //  this.uploader.addToQueue(blobArr);
          //  this.uploader.getNotUploadedItems()[0].alias = "signatureImage";
      
          if (this.myPhoto) {
            let node = document.getElementById('myPhotoId');
            domtoimage.toBlob(node)
              .then((blob) => {
                blob['name'] = 'photoImage.jpg';
                blobArr.push(<File>blob);
               /*  if (isSignImage)
                  // this.uploader.getNotUploadedItems()[1].alias = "photoImage";
                  console.log("new alias one");
                else
                  // this.uploader.getNotUploadedItems()[0].alias = "photoImage";
                  console.log("new alias two");
                this.uploadCall(); */
                this.uploader.addToQueue(blobArr);
                this.uploadCall();
              });
            }   
          }); 
        }
        else{
        if(this.signatureImage){
          isSignImage = true;
          let node = document.getElementById('signImage');
          domtoimage.toBlob(node)
            .then((blob) => {
              blob['name'] = 'signatureImage.jpg';       
              blobArr.push(<File>blob);
              this.uploader.addToQueue(blobArr);
              console.log(this.uploader);

          this.uploadCall();
        }); 
      }

        if(this.myPhoto){
          console.log("pic");

          let node = document.getElementById('myPhotoId');
          domtoimage.toBlob(node)
            .then((blob) => {
              console.log(blob);
              blob['name'] = 'photoImage.jpg';
              console.log(blob);
              blobArr.push(<File>blob);
             console.log(blobArr);
              console.log(this.uploader);
             /*  if (isSignImage)
                // this.uploader.getNotUploadedItems()[1].alias = "photoImage";
                console.log("new alias one");
              else
                // this.uploader.getNotUploadedItems()[0].alias = "photoImage";
                console.log("new alias two");
              this.uploadCall(); */
              this.uploader.addToQueue(blobArr);
        console.log(this.uploader);
        
          this.uploadCall();
        });
        }
      }
    // });
  }

  uploadCall() {
    console.log(" ################");
    console.log( this.uploader);
    console.log(" ################");
   this.uploader.uploadAll();
    this.hasTripStarted = !this.hasTripStarted;
    if (this.hasTripStarted) {
      alert("Proof of Delivery Created!");
      this.navCtrl.push(HomeComponent);
    }
    else {
      alert("Error in creating Proof of Delivery");
    }
  }

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
