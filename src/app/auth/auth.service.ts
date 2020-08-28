import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userId="abc"
  userIsAuthrnticated: boolean = true;
  constructor() { }

  login() {
    this.userIsAuthrnticated = true;
  }

  logout() {
    this.userIsAuthrnticated = false;
  }

  get userId(){
    return this._userId;
  }
}
