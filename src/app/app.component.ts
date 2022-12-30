import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ForgotWordListComponent } from './forgot-word-list/forgot-word-list.component';
import { ConfirmData, MakeConfirmComponent } from './make-confirm/make-confirm.component';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';
import { TargetWordListComponent } from './target-word-list/target-word-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'kanji';
  @ViewChild('group') group: MatButtonToggleGroup;
  @ViewChild('group2') group2: MatButtonToggleGroup;
  @ViewChild('target') target: TargetWordListComponent;
  @ViewChild('forgot') forgot: ForgotWordListComponent;
  @ViewChild('card1') card1: ScratchCardComponent;
  @ViewChild('card2') card2: ScratchCardComponent;
  @ViewChild('wc1') wc1: ScratchCardComponent;
  @ViewChild('wc2') wc2: ScratchCardComponent;

  constructor(public dialog: MatDialog, public _snackbar: MatSnackBar) {
    this.lastOn.subscribe(() => {
      this.vv *= -1;

    });
  }

  // TODO：直接让动画重播
  vv: number = 1;

  ngAfterViewInit() {

    this.group.valueChange.subscribe(x => {
      if (this.group.value) {
        // alert(this.group.value);
      }
    });
  }

  lastword() {
    this.lastOne = this.currentWord + ' ' + this.currentPron;
    this.lastOn.next(this.lastOne);
    if (this.target.cursor <= 0) {
      return;
    }
    this.target.cursor--;
    let tuple = this.target.deck[this.target.cursor % this.target.deck.length];
    this.currentWord = tuple[0];
    this.currentPron = tuple[1];
    this.currentCursor = `${this.target.cursor % this.target.deck.length + 1} / ${this.target.deck.length}`;
    this.card1.hide = true;
  }
  cli() {
    this.lastOne = this.currentWord + ' ' + this.currentPron;
    this.lastOn.next(this.lastOne);
    this.target.cursor++;
    let tuple = this.target.deck[this.target.cursor % this.target.deck.length];
    this.currentWord = tuple[0];
    this.currentPron = tuple[1];
    this.currentCursor = `${this.target.cursor % this.target.deck.length + 1} / ${this.target.deck.length}`;
    this.card1.hide = true;
  }

  currentWord: string = '';
  currentPron: string = '';
  currentCursor: string = '';
  lastOne: string = '';
  lastOn: Subject<string> = new Subject();

  onImported() {
    let tuple = this.target.deck[this.target.cursor % this.target.deck.length];
    this.currentWord = tuple[0];
    this.currentPron = tuple[1];
    this.currentCursor = `${(this.target.cursor % this.target.deck.length) + 1} / ${this.target.deck.length}`;
    this.card2.hide = true;
    this.card1.hide = true;
  }

  last() {
    this.lastOne = this.currentWord + ' ' + this.currentPron;
    this.lastOn.next(this.lastOne);
    if (this.target.cursor <= 0) {
      return;
    }
    this.target.cursor--;
    let tuple = this.target.deck[this.target.cursor % this.target.deck.length];
    this.currentWord = tuple[0];
    this.currentPron = tuple[1];
    this.currentCursor = `${this.target.cursor % this.target.deck.length + 1} / ${this.target.deck.length}`;
    this.card2.hide = true;
    setTimeout(() => { this.speak(tuple[0]) }, 100);
    console.log(this.currentWord);
  }

  // bug: 听力界面有滚动条
  // 听和读进度独立
  next() {
    this.lastOne = this.currentWord + ' ' + this.currentPron;
    this.lastOn.next(this.lastOne);
    this.target.cursor++;
    let tuple = this.target.deck[this.target.cursor % this.target.deck.length];
    this.currentWord = tuple[0];
    this.currentPron = tuple[1];
    this.currentCursor = `${this.target.cursor % this.target.deck.length + 1} / ${this.target.deck.length}`;
    this.card2.hide = true;
    setTimeout(() => { this.speak(tuple[0]) }, 100);
    console.log(this.currentWord);
  }

  relisten() {

    setTimeout(() => { this.speak(this.currentWord) }, 100);
  }


  speak(word: string) {
    if ('speechSynthesis' in window) {
      var synthesis = window.speechSynthesis;

      // Get the first `en` language voice in the list
      var voice = synthesis.getVoices().filter(function (voice) {
        return voice.lang === 'ja';
      })[0];

      // Create an utterance object
      var utterance = new SpeechSynthesisUtterance(word);

      // Set utterance properties
      utterance.voice = voice;
      utterance.pitch = 1.0;
      utterance.rate = 0.8;
      utterance.volume = 1;

      // Speak the utterance
      synthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported.');
    }

  }

  dontknow() {
    if (this.group2.value === 'deathmatch') {
      // 洗牌时需要清理
      this.target.deck.push([this.currentWord, this.currentPron]);
    } else {

      this._snackbar.open('已添加', 'OK', { duration: 1000 } as MatSnackBarConfig);
      this.forgot.append(this.currentWord, this.currentPron);
    }
  }


  readShuffle() {
    const dialogRef = this.dialog.open(MakeConfirmComponent,
      { data: { yesText: '是', noText: '否', prompt: '确定洗牌吗？' } as ConfirmData } as MatDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {

        this.target.shuffle();
        // this.cli();
        this.onImported();
      }
    });
  }

  listenShuffle() {

    const dialogRef = this.dialog.open(MakeConfirmComponent,
      { data: { yesText: '是', noText: '否', prompt: '确定洗牌吗？' } as ConfirmData } as MatDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {

        this.target.shuffle();
        this.onImported();
      }
    });
  }
}
