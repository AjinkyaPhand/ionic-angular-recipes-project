import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { map } from 'rxjs/operators';
import { Plugins, Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private modalController: ModalController, private http: HttpClient,
    private actionController: ActionSheetController, private alert: AlertController) { }

  ngOnInit() { }

  onPickLocation() {

    this.actionController.create({
      header: "Please choose",
      buttons: [
        {
          text: "Auto Locate",
          handler: () => {
            this.locateUser();
          }
        },
        {
          text: "Pick On Map",
          handler: () => {
            this.openMap();
          }
        },
        {
          text: "Cancel",
          role: 'cancel'
        }
      ]
    }).then(ele => {
      ele.present();
    })
  }

  private openMap() {
    this.modalController.create({
      component: MapModalComponent
    }).then(modalEl => {
      modalEl.onDidDismiss().then(result => {
        console.log(result.data);
        if (!result.data) {
          return;
        }
        this.getAddress(result.data.lat, result.data.lng).subscribe(
          () => {

          }
        )
      })
      modalEl.present();
    })
  }

  private locateUser() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorAlert();
      return;
    }
    Plugins.Geolocation.getCurrentPosition().then(
      position => {
        console.log(position)
      }
    ).catch(err => {
      this.showErrorAlert();
    })
  }

  showErrorAlert() {
    this.alert.create({
      header: "Could not fetch location",
      message: "Please try again later."
    }).then(alertEle => {
      alertEle.present();
    })
  }

  private getAddress(lat: number, lng: number) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + environment.googleMapsAPIKey)
      .pipe(map(
        geoData => {
          console.log(geoData);
        }
      ))
  }

}
