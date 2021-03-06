import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { NgModule } from '@angular/core';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
    exports: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
    entryComponents: [MapModalComponent],
    imports: [CommonModule, IonicModule]
})
export class SharedModule {

}