import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() bookedPlace: Place

  constructor(private modalController:ModalController) { }

  ngOnInit() { }

  onCancel(){
    this.modalController.dismiss(null,'cancel')
  }

  onBookPlace(){
    this.modalController.dismiss({
      message:'This is a message'
    },
    'confirm')
  }

}
