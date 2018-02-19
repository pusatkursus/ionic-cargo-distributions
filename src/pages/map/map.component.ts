import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SignatureComponent } from '../signature/signature.component';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { File, FileEntry } from "@ionic-native/file";
import {LoadingController, Loading, ToastController} from "ionic-angular";
import { AuthService } from '../../app/auth.service';
import { TriplistComponent } from '../triplist/triplist.component';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: []
})
export class MapComponent implements OnInit {
  public signatureImage : any;
  public pickupRequestVehicleTripId : any ;
  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;
  hasTripStarted = false;

  constructor(
    public navCtrl: NavController,
    public navParams:NavParams,
    public modalController:ModalController,
    private camera : Camera,
    private readonly loadingCtrl: LoadingController,
    private readonly file: File,
    private http: HttpClient,
    private auth: AuthService, 
    private nativeStorage: NativeStorage,
  //  private uploader : FileUploader
    )

    { 
    this.signatureImage = navParams.get('signatureImage');
    }

  ngOnInit() {
   /* this.uploader = new FileUploader({
      url: this.auth.getRemoteUrl() + '/cargo/api/create_proofOfDelivery',
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });*/
    this.nativeStorage.getItem('pickupRequestTripId')
   .then(
   data => this.pickupRequestVehicleTripId = data ,
   error => console.log(error)
   );
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

  openSignatureModel(){
    setTimeout(() => {
       let modal = this.modalController.create(SignatureComponent);
    modal.present();
    }, 300);
  
  }
 takePhoto() {
  this.camera.getPicture({
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.PNG,
    saveToPhotoAlbum: true
  }).then(imageData => {
   
    // this.myPhoto = imageData;
    this.displayImage(imageData)
    // this.uploadPhoto(imageData);
  }, error => {
    console.log(JSON.stringify(error));
    
  });
}



// private uploadPhoto(imageFileUri: any): void {
//   this.error = null;
//   this.loading = this.loadingCtrl.create({
//     content: 'Uploading...'
//   });

//   this.loading.present();

//   this.file.resolveLocalFilesystemUrl(imageFileUri)
//     .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
//     .catch(err => console.log(err));
// }



// private readFile(file: any) {
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     const formData = new FormData();
//     const imgBlob = new Blob([reader.result], {type: file.type});
//     console.log(imgBlob);
//    // formData.append('file', imgBlob, file.name);
//     // this.postData(formData);
//   };
//   reader.readAsArrayBuffer(file);
// }

private displayImage(imgUri) {
  this.myPhoto = "data:image/jpeg;base64," + imgUri;;
  console.log(this.myPhoto);
}


pod(){

  console.log(this.pickupRequestVehicleTripId);

 let str =
{
  proofOfDeliveryInput: JSON.stringify({
    pickup_request_vehicle_trip_id: this.pickupRequestVehicleTripId,
    delivered_to_person: 'xyz',
    user_id: this.auth.getUserId(),
    delivered_date: new Date().toISOString().split("T")[0].split("-").join('/'),
    delivered_time: new Date().toTimeString().split(":").splice(0,2).join(":"),
    comment: ''
  }),
  signatureImage : this.signatureImage,
  photoImage : this.myPhoto 
}

this.http.post(this.auth.getRemoteUrl() + '/cargo/api/create_proofOfDelivery', this.getFormUrlEncoded(str),{headers : this.auth.getRequestHeaders()}).subscribe((data) => {
console.log(data);
this.hasTripStarted = !this.hasTripStarted;
if (this.hasTripStarted) {
  alert("Proof of Delivery Created!"); 
  this.navCtrl.push(TriplistComponent);
}
else {
  alert("Error in creating Proof of Delivery");
}
});
}

cancel(){
  this.navCtrl.push(TriplistComponent);
}


}
