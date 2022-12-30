import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotWordListComponent } from './forgot-word-list/forgot-word-list.component';
import { MakeConfirmComponent } from './make-confirm/make-confirm.component';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';
import { TargetWordListComponent } from './target-word-list/target-word-list.component';
import { WordCardComponent } from './word-card/word-card.component';


@NgModule({
  declarations: [
    AppComponent,
    ForgotWordListComponent,
    TargetWordListComponent,
    ScratchCardComponent,
    WordCardComponent,
    MakeConfirmComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {



}
