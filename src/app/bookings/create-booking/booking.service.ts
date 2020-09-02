import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface BookingData {
  bookedFrom: string;
  bookedTo: string;
  fname: string;
  guestNumber: number,
  lName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId: string;

}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([])

  constructor(private authService: AuthService, private http: HttpClient) { }

  get bookings() {
    return this._bookings.asObservable();
  }

  addBooking(placeId: string, placeTitle: string, placeImage: string, firstName: string, lastName: string, guestNo: number,
    dateFrom: Date, dateTo: Date) {
    let geenratedId: string;
    const newBooking = new Booking("p1", placeId, this.authService.userId, placeTitle, guestNo, placeImage, firstName, lastName, dateFrom, dateTo)

    return this.http.post<{ name: string }>("https://ionic-book-my-place.firebaseio.com/bookings.json", { ...newBooking, id: null })
      .pipe(switchMap(respData => {
        geenratedId = respData.name;
        return this.bookings;
      }),
        take(1)
        , tap(bookings => {
          newBooking.id = geenratedId;
          this._bookings.next(bookings.concat(newBooking))
        }));

    // return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
    //   this._bookings.next(bookings.concat(newBooking))
    // }))
  }

  cancelBooking(bookingId: string) {
    return this.http.delete(`https://ionic-book-my-place.firebaseio.com/bookings/${bookingId}.json`)
    // return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
    //   this._bookings.next(bookings.filter(b => { b.id !== bookingId }))
    // }))
  }

  fetchBookings() {
    return this.http.get<{ [key: string]: BookingData }>(`https://ionic-book-my-place.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`)
      .pipe(map(bookingData => {
        const bookings = [];
        for (const key in bookingData) {
          if (bookingData.hasOwnProperty(key)) {
            bookings.push(new Booking(key, bookingData[key].placeId, bookingData[key].userId, bookingData[key].placeTitle,
              bookingData[key].guestNumber, bookingData[key].placeImage, bookingData[key].fname, bookingData[key].lName,
              new Date(bookingData[key].bookedFrom), new Date(bookingData[key].bookedTo)))
          }
        }
        return bookings;
      })
        , tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }

}
