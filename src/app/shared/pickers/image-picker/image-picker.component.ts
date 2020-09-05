import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  constructor() { }
  selectedImg: string;
  ngOnInit() { }

  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera")) {
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Uri
    }).then(img => {
      this.selectedImg = img.webPath;
      console.log(this.selectedImg)
    }).catch(err => {
      console.log("error");
      return false;
    })
  }

}
