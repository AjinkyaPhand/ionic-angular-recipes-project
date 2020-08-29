import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private _places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'New York',
      'This is New York city, Welcome',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      299.55,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      "xxx"
    ),
    new Place(
      'p2',
      'Paris',
      'This is Paris city, Welcome',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
      159.55,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      "abc"
    ),
    new Place(
      'p3',
      'India',
      'Welcome to India, Delhi is the capital',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
      159.55,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      "abc"
    )
  ])


  get places() {
    return this._places.asObservable();
  }

  findPlaceById(placeId: string) {
    return this.places.pipe(take(1), map((places) => {
      return { ...places.find(place => place.id === placeId) }
    }));
  }

  addPlace(title: string, description: string, price: number, fromDate: Date, toDate: Date) {
    const newPlace = new Place("p4", title, description, "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      price, fromDate, toDate, this.authService.userId);

    return this.http.post<{ name: string }>("https://ionic-book-my-place.firebaseio.com/offered-places.json", {
      ...newPlace, id: null
    }).pipe(tap(resp => {
      console.log(resp)
    }))

    // return this.places.pipe(take(1), delay(1000), tap(places => {
    //   setTimeout(() => {
    //     this._places.next(places.concat(newPlace));

    //   }, 1000)
    // }));
  }

  editOffer(placeId: string, title: string, description: string) {
    return this.places.pipe(take(1), delay(1000), tap(places => {
      const updatedPlaceIndex = places.findIndex(ele => {
        return ele.id === placeId
      })
      const updatedPlace = [...places];
      const old = updatedPlace[updatedPlaceIndex];
      updatedPlace[updatedPlaceIndex] = new Place(old.id, title, description, old.imageURL, old.price, old.fromDate, old.toDate, old.userId)
      this._places.next(updatedPlace);
    }));
  }


}
