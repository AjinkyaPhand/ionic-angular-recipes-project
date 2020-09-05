import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { resolve } from 'dns';
import { rejects } from 'assert';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapElementRef: ElementRef
  constructor(private modalController: ModalController, private render: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.getGoogleMaps().then(
      googleMaps => {
        const mapEle = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEle, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 16
        });
        googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.render.addClass(mapEle, 'visible');
        });
        map.addListener('click', event => {
          const coords = {
            lat: event.latLng.lat(), lng: event.latLng.lng()
          };
          this.modalController.dismiss(coords);
        })
      }
    ).catch(err => {

    })
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=" + environment.googleMapsAPIKey
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        }
        else {
          reject("Google maps SDK not available");
        }
      }
    })
  }

  onCancel() {
    this.modalController.dismiss();
  }

}
