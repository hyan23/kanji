import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { BookNameDialogComponent, TargetWordListComponent } from './target-word-list/target-word-list.component';
import { WordBookListComponent } from './word-book-list/word-book-list.component';
import { WordCardComponent } from './word-card/word-card.component';

import { MatIconModule } from '@angular/material/icon';
import { BookViewDialogComponent } from './book-view-dialog/book-view-dialog.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {



}
