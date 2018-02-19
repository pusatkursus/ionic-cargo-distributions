import { Component, OnInit,ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
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
    'canvasHeight': 400
  };
  public signatureImage : string;

  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  drawCancel() {
    this.navCtrl.push(PodComponent);
  }

   drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    this.navCtrl.push(PodComponent, {signatureImage: this.signatureImage});
  }

  drawClear() {
    this.signaturePad.clear();
  }

}
