import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userIsAuthrnticated: boolean = true;
  constructor() { }

  login() {
    this.userIsAuthrnticated = true;
  }

  logout() {
    this.userIsAuthrnticated = false;
  }
}
