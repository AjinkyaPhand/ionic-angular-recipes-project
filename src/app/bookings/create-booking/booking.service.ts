import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([])

  constructor(private authService: AuthService) { }

  get bookings() {
    return this._bookings.asObservable();
  }

  addBooking(placeId: string, placeTitle: string, placeImage: string, firstName: string, lastName: string, guestNo: number,
    dateFrom: Date, dateTo: Date) {
    const newBooking = new Booking("p1", placeId, this.authService.userId, placeTitle, guestNo, placeImage, firstName, lastName, dateFrom, dateTo)
    return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
      this._bookings.next(bookings.concat(newBooking))
    }))
  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
      this._bookings.next(bookings.filter(b => { b.id !== bookingId }))
    }))
  }

}
