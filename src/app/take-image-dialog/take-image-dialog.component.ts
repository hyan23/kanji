import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as cv from "@techstark/opencv-js";
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

declare global {
  var Tesseract: any;
}

function cleanImage(src: HTMLElement, dest: HTMLElement) {
  let original = cv.imread(src);
  let gray = cv.Mat.zeros(original.rows, original.cols, original.type());
  let binary = cv.Mat.zeros(original.rows, original.cols, original.type());
  let hlines = cv.Mat.zeros(original.rows, original.cols, original.type());
  let vlines = cv.Mat.zeros(original.rows, original.cols, original.type());
  let result = cv.Mat.zeros(original.rows, original.cols, original.type());

  cv.cvtColor(original, gray, cv.COLOR_BGR2GRAY);
  // TODO:adaptiveThreshold?
  cv.threshold(gray, binary, 50, 255, cv.THRESH_BINARY_INV | cv.THRESH_OTSU)
  let kernel1 = cv.getStructuringElement(cv.MORPH_RECT, { width: 50, height: 1 });
  //TODO:iteration
  cv.morphologyEx(binary, hlines, cv.MORPH_OPEN, kernel1);
  // cv.threshold(hlines, hlines, 0, 255, cv.THRESH_BINARY);
  let k = cv.getStructuringElement(cv.MORPH_RECT, { width: 5, height: 5 });
  cv.dilate(hlines, hlines, k);

  let kernel2 = cv.getStructuringElement(cv.MORPH_RECT, { width: 1, height: 50 });
  cv.morphologyEx(binary, vlines, cv.MORPH_OPEN, kernel2);
  // cv.threshold(vlines, vlines, 0, 255, cv.THRESH_BINARY);
  cv.dilate(vlines, vlines, k);

  cv.threshold(gray, result, 180, 255, cv.THRESH_BINARY);
  cv.add(result, hlines, result);
  cv.add(result, vlines, result);
  cv.imshow(dest, result);
  // cv.imshow(d, new cv.Mat(dest.rows, dest.cols, dest.type(), [50, 50, 50, 50]));
}

async function recognize(cavas: HTMLElement) {

  const worker = await Tesseract.createWorker({
    logger: (m: any) => console.log(m)
  });


  // TODO:设置参数
  (async () => {
    // https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016
    await worker.loadLanguage('chi_sim');
    await worker.initialize('chi_sim');
    // await worker.setParameters({
    //     tessedit_pageseg_mode: 10,
    // });
    // await worker.setParameters({
    //     tessedit_ocr_engine_mode: 3,
    // });
    const { data: { text } } = await worker.recognize(cavas);
    console.log(text);
    await worker.terminate();
  })();
}

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

  @ViewChild('croppedImage1Img') img1: ElementRef;
  @ViewChild('croppedImage2Img') img2: ElementRef;
  @ViewChild('cleanedImage1') canvas1: ElementRef;
  @ViewChild('cleanedImage2') canvas2: ElementRef;


  changed(ev: StepperSelectionEvent) {
    if (ev.selectedIndex == 1) {
      if (this.imageChangedEventForCropper2 === '') {
        this.imageChangedEventForCropper2 = this.imageChangedEvent;
      }
    }
    if (ev.selectedIndex == 2) {

      setTimeout(() => {
        cleanImage(this.img1.nativeElement, this.canvas1.nativeElement);
        cleanImage(this.img2.nativeElement, this.canvas2.nativeElement);


        recognize(this.canvas1.nativeElement);
        recognize(this.canvas2.nativeElement);
      }, 0);

    }
  }

  showInterImages: boolean = false;
}
