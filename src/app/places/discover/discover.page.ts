import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  loadedPlaces: Place[]
  listedLoadedPlaces: Place[];
  releventPlaces: Place[];

  constructor(private serviceObject: PlacesService, private authService: AuthService) { }

  ngOnInit() {
    this.serviceObject.places.subscribe(places => {
      this.loadedPlaces = places;
      this.releventPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.releventPlaces.slice(1)
    })
  }

  ionViewWillEnter() {
  }

  segmentChanged(event: CustomEvent) {
    if (event.detail.value === "All") {
      this.releventPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.releventPlaces.slice(1)
    }
    else {
      this.releventPlaces = this.loadedPlaces.filter(place => {
        return place.userId === this.authService.userId
      })
      console.log(this.releventPlaces)
      this.listedLoadedPlaces = this.releventPlaces.slice(1)
    }
  }

}
