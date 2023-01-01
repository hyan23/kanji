import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-take-image-dialog',
  templateUrl: './take-image-dialog.component.html',
  styleUrls: ['./take-image-dialog.component.css']
})
export class TakeImageDialogComponent implements AfterViewInit {

  constructor(@Inject(MAT_DIALOG_DATA) private takeFrom: string, private dialogRef: MatDialogRef<TakeImageDialogComponent>,
    private _formBuilder: FormBuilder
  ) {

  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  ngAfterViewInit(): void {
    if (this.takeFrom === 'camera') {
      this.camera.nativeElement.click();
    } else if (this.takeFrom === 'file') {
      this.file.nativeElement.click();
    } else {
      console.log(`error! unknown parameter ${this.takeFrom}, closing`);
      this.dialogRef.close();
    }
  }

  @ViewChild('camera') camera: ElementRef;
  @ViewChild('file') file: ElementRef;

  imageChangedEvent: any = '';
  // 需要切换到第二步再赋值，否则第二步的图片会因为用户在第一步停留太久而加载失败
  imageChangedEventForCropper2: any = '';
  croppedImage1: any = '';
  croppedImage2: any = '';

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage1 = event.base64;
  }
  imageCropped2(event: ImageCroppedEvent) {
    this.croppedImage2 = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  changed(ev: StepperSelectionEvent) {
    if (ev.selectedIndex == 1) {
      if (this.imageChangedEventForCropper2 === '') {
        this.imageChangedEventForCropper2 = this.imageChangedEvent;
      }
    }
  }
}
