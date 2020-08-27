import { Component, OnInit } from '@angular/core';
import { BookingService } from './create-booking/booking.service';
import { Booking } from './create-booking/booking.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  loadedBookings: Booking[];
  constructor(private serviceObject: BookingService) { }

  ngOnInit() {
    this.loadedBookings = this.serviceObject.bookings
  }

  onCancelBooking(offerId:string,slidingEle:IonItemSliding){
    slidingEle.close();
    
  }

}
