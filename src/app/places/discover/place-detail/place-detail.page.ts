import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(private navController: NavController, private serviceObject: PlacesService,
    private route: ActivatedRoute, private modelController: ModalController,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        if (!params.get("placeId")) {
          this.navController.navigateBack("/places/tabs/discover")
          return
        }
        this.serviceObject.findPlaceById(params.get("placeId")).subscribe(place => {
          this.place = place;
        })
      }
    )
  }

  onBookPlace() {
    this.actionSheetController.create({
      header: "Choose an action",
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('selected');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then((ele) => {
      ele.present()
    })
  }

  openBookingModal(mode: 'selected' | 'random') {
    this.modelController.create({
      component: CreateBookingComponent,
      componentProps: {
        bookedPlace: this.place, selectedMode: mode
      }
    }).then((myModal) => {
      myModal.present();
      return myModal.onDidDismiss()
    }).then(resutData => {
      console.log(resutData.data, resutData.role)
      if (resutData.role == "confirm") {
        console.log(resutData.data);
      }
    })
  }



}
