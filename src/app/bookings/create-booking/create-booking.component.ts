import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() bookedPlace: Place;
  @Input() selectedMode: 'selected' | 'random';
  startDate: string;
  endDate: string;
  @ViewChild("f", { static: true }) form: NgForm;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const avaliableFrom = new Date(this.bookedPlace.fromDate)
    const avaliableTo = new Date(this.bookedPlace.toDate)
    if (this.selectedMode === "random") {
      this.startDate = new Date(avaliableFrom.getTime() + Math.random() * (avaliableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - avaliableFrom.getTime())).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())).toISOString();
    }
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel')
  }

  onBookPlace() {
    if(!this.form.valid || !this.datesValid()){
      return;
    }
    this.modalController.dismiss({
      bookingData:{
        firstName:this.form.value['firstname'],
        lastName:this.form.value['lastname'],
        guestNumber:this.form.value['guestnumber'],
        startDate:this.form.value['dateFrom'],
        endDate:this.form.value['dateTo']
      }
    },
      'confirm')
  }

  datesValid() {
    const startDate = this.form.value['dateFrom'];
    const endDate = this.form.value['dateTo'];
    return endDate > startDate;
  }


}
