import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  description: string
  fromDate: string
  imageURL: string
  price: number
  title: string
  toDate: string
  userId: string
}


// new Place(
//   'p1',
//   'New York',
//   'This is New York city, Welcome',
//   'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//   299.55,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   "xxx"
// ),
// new Place(
//   'p2',
//   'Paris',
//   'This is Paris city, Welcome',
//   'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
//   159.55,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   "abc"
// ),
// new Place(
//   'p3',
//   'India',
//   'Welcome to India, Delhi is the capital',
//   'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
//   159.55,
//   new Date('2019-01-01'),
//   new Date('2019-12-31'),
//   "abc"
// )


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private _places = new BehaviorSubject<Place[]>([])


  get places() {
    return this._places.asObservable();
  }

  fetchPlaces() {
    return this.http.get<{ [key: string]: PlaceData }>("https://ionic-book-my-place.firebaseio.com/offered-places.json")
      .pipe(
        map(resp => {
          const places = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              places.push(new Place(key, resp[key].title, resp[key].description, resp[key].imageURL,
                resp[key].price, new Date(resp[key].fromDate), new Date(resp[key].toDate), resp[key].userId))
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places)
        })
      )
  }

  findPlaceById(placeId: string) {
    return this.http.get<PlaceData>(`https://ionic-book-my-place.firebaseio.com/offered-places/${placeId}.json`)
    .pipe(
      map(placeData=>{
        return new Place(placeId,placeData.title,placeData.description,placeData.imageURL,
          placeData.price,new Date(placeData.fromDate),new Date(placeData.toDate),placeData.userId)
      })
    )


    // return this.places.pipe(take(1), map((places) => {
    //   return { ...places.find(place => place.id === placeId) }
    // }));
  }

  addPlace(title: string, description: string, price: number, fromDate: Date, toDate: Date) {
    let generatedId = "";
    const newPlace = new Place("p4", title, description, "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      price, fromDate, toDate, this.authService.userId);

    return this.http.post<{ name: string }>("https://ionic-book-my-place.firebaseio.com/offered-places.json", {
      ...newPlace, id: null
    }).pipe(
      switchMap(respData => {
        generatedId = respData.name;
        return this.places
      }),
      take(1),
      tap(places => {
        newPlace.id = generatedId;
        this._places.next(places.concat(newPlace));
      })
    )

    // return this.places.pipe(take(1), delay(1000), tap(places => {
    //   setTimeout(() => {
    //     this._places.next(places.concat(newPlace));

    //   }, 1000)
    // }));
  }

  editOffer(placeId: string, title: string, description: string) {
    let updatedPlace: Place[];
    return this.places.pipe(take(1), switchMap(places => {
      const updatedPlaceIndex = places.findIndex(ele => {
        return ele.id === placeId
      })
      updatedPlace = [...places];
      const old = updatedPlace[updatedPlaceIndex];
      updatedPlace[updatedPlaceIndex] = new Place
        (old.id, title, description, old.imageURL, old.price, old.fromDate, old.toDate, old.userId)
      return this.http.put(`https://ionic-book-my-place.firebaseio.com/offered-places/${placeId}.json`,
        {
          ...updatedPlace[updatedPlaceIndex], id: null
        });
    }), tap(() => {
      this._places.next(updatedPlace);
    })
    );
  }

  //   return this.places.pipe(take(1), tap(places => {
  //     const updatedPlaceIndex = places.findIndex(ele => {
  //       return ele.id === placeId
  //     })
  //     const updatedPlace = [...places];
  //     const old = updatedPlace[updatedPlaceIndex];
  //     updatedPlace[updatedPlaceIndex] = new Place(old.id, title, description, old.imageURL, old.price, old.fromDate, old.toDate, old.userId)
  //     this._places.next(updatedPlace);
  //   }));
  // }
}


