import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookViewDialogComponent } from './book-view-dialog/book-view-dialog.component';
import { ForgotWordListComponent } from './forgot-word-list/forgot-word-list.component';
import { MakeConfirmComponent } from './make-confirm/make-confirm.component';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { TakeImageDialogComponent } from './take-image-dialog/take-image-dialog.component';
import { BookNameDialogComponent, BottomSheetOverviewExampleSheet, TargetWordListComponent } from './target-word-list/target-word-list.component';
import { WordBookListComponent } from './word-book-list/word-book-list.component';
import { WordCardComponent } from './word-card/word-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ForgotWordListComponent,
    TargetWordListComponent,
    ScratchCardComponent,
    WordCardComponent,
    MakeConfirmComponent,
    WordBookListComponent,
    BookNameDialogComponent,
    BookViewDialogComponent,
    BottomSheetOverviewExampleSheet,
    TakeImageDialogComponent,
    SelectLanguageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    MatListModule,
    ClipboardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    ImageCropperModule,
    MatBottomSheetModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {



}
