import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  myForm: FormGroup;

  constructor(private placeService: PlacesService, private route: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    })
  }

  onCreateOffer() {
    if (this.myForm.invalid) {
      return;
    }
    this.loadingController.create({
      keyboardClose: true,
      message: "Creating place..."
    }).then((loadingEle) => {
      loadingEle.present();
      this.placeService.addPlace(this.myForm.value.title, this.myForm.value.description, +this.myForm.value.price,
        new Date(this.myForm.value.dateFrom), new Date(this.myForm.value.dateTo)).subscribe(() => {
          this.myForm.reset();
          this.route.navigate(['/places/tabs/offers'])
          loadingEle.dismiss();
        })
    })

  }

}
