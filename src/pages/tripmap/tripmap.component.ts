import { Component, ViewChild, ElementRef, OnInit,Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@Component({
  selector: 'tripmap',
  templateUrl: './tripmap.component.html',
  styleUrls: []
})
export class TripmapComponent implements OnInit {

  private contentPlaceholder: ElementRef;

  @ViewChild('contentPlaceholder') set content(content: ElementRef) {
    this.contentPlaceholder = content;
  }

  @Input() triplistdata;


  map: any;

  constructor( public geolocation: Geolocation) { }

  ngOnInit() {
    setTimeout(() => {
      const location = new google.maps.LatLng(13.0005618, 80.2478447);

      const options = {
        center: location,
        zoom: 6,
        streetViewControl: false,
      };

      this.map = new google.maps.Map(this.contentPlaceholder.nativeElement, options);
      this.getMarkers();
      google.maps.event.trigger(this.map, 'resize');
    }, 1000);
    console.log(this.triplistdata);
  }

  ngAfterViewInit() {
    console.log(this.contentPlaceholder);
  }



  getMarkers() {
    var infowindow = new google.maps.InfoWindow();

    var bounds = new google.maps.LatLngBounds();

    var marker, list = this.triplistdata;
    if (this.triplistdata.length > 0) {
      for (let i = 0; i < this.triplistdata.length; i++) {
        marker = this.addMarkersToMap(this.triplistdata[i]);
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
