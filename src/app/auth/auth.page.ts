import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading: boolean = true;
  isLogin = true;
  constructor(private serviceObject: AuthService, private route: Router, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  onLogin() {
    // this.serviceObject.login()
    this.isLoading = true;
    this.loadingController.create({
      keyboardClose: true,
      message: "Login In"
    }).then((loadingEle) => {
      loadingEle.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEle.dismiss();
        this.route.navigate(['/places/tabs/discover'])
      }, 1500)
    })
  }

  onSubmit(myForm: NgForm) {
    console.log(myForm)
    if (myForm.invalid) {
      return;
    }
    const email = myForm.value.email;
    const password = myForm.value.password;
    if (this.isLogin) {

    }
    else {
    }
  }

  onClickSwitchAuthModes() {
    this.isLogin = !this.isLogin;
  }

}
