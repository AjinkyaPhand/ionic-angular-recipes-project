import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place(
      'p1',
      'New York',
      'This is New York city, Welcome',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      299.55
    ),
    new Place(
      'p2',
      'Paris',
      'This is Paris city, Welcome',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
      159.55
    ),
    new Place(
      'p2',
      'India',
      'Welcome to India, Delhi is the capital',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
      159.55
    )
  ];


  get places(): Place[] {
    return [...this._places];
  }

  findPlaceById(placeId: string): Place {
    return { ...this._places.find(place => place.id === placeId) }
  }


  constructor() { }
}
