import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { BookShelfService, Word } from './book-shelf.service';
import { ForgotWordListComponent } from './forgot-word-list/forgot-word-list.component';
import { ConfirmData, MakeConfirmComponent } from './make-confirm/make-confirm.component';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';
import { TargetWordListComponent } from './target-word-list/target-word-list.component';

import * as googleTTS from 'google-tts-api'; // ES6 or TypeScript
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

  constructor(public dialog: MatDialog, public _snackbar: MatSnackBar,
    private bs: BookShelfService) {
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
    this.bs.currentBookChanged.subscribe(x => {
      this.deck = [...x.book];
      this.cursor = 0;
      console.log(this.deck);
      this.start();
    });
  }

  lastword() {
    // this.lastOne = this.currentWord + ' ' + this.currentPron;
    // this.lastOn.next(this.lastOne);
    if (this.cursor <= 0) {
      return;
    }
    this.cursor--;
    let tuple = this.deck[this.cursor % this.deck.length];
    this.currentWord = tuple.from;
    this.currentPron = tuple.to;
    this.currentCursor = `${this.cursor % this.deck.length + 1} / ${this.deck.length}`;
    this.card1.hide = true;
  }
  cli() {
    this.lastOne = this.currentWord + ' ' + this.currentPron;
    this.lastOn.next(this.lastOne);
    this.cursor++;
    let tuple = this.deck[this.cursor % this.deck.length];
    this.currentWord = tuple.from;
    this.currentPron = tuple.to;
    this.currentCursor = `${this.cursor % this.deck.length + 1} / ${this.deck.length}`;
    this.card1.hide = true;
  }

  currentWord: string = '';
  currentPron: string = '';
  currentCursor: string = '';
  lastOne: string = '';
  lastOn: Subject<string> = new Subject();

  start() {
    if (this.deck.length === 0) {
      return;
    }
    let tuple = this.deck[this.cursor % this.deck.length];
    this.currentWord = tuple.from;
    this.currentPron = tuple.to;
    this.currentCursor = `${(this.cursor % this.deck.length) + 1} / ${this.deck.length}`;
    this.card2.hide = true;
    this.card1.hide = true;
  }

  last() {
    // this.lastOne = this.currentWord + ' ' + this.currentPron;
    // this.lastOn.next(this.lastOne);
    if (this.cursor <= 0) {
      return;
    }
    this.cursor--;
    let tuple = this.deck[this.cursor % this.deck.length];
    this.currentWord = tuple.from;
    this.currentPron = tuple.to;
    this.currentCursor = `${this.cursor % this.deck.length + 1} / ${this.deck.length}`;
    this.card2.hide = true;
    setTimeout(() => { this.speak(tuple.from) }, 100);
  }

  // bug: 听力界面有滚动条
  // 听和读进度独立
  next() {
    this.lastOne = this.currentWord + ' ' + this.currentPron;
    this.lastOn.next(this.lastOne);
    this.cursor++;
    let tuple = this.deck[this.cursor % this.deck.length];
    this.currentWord = tuple.from;
    this.currentPron = tuple.to;
    this.currentCursor = `${this.cursor % this.deck.length + 1} / ${this.deck.length}`;
    this.card2.hide = true;
    setTimeout(() => { this.speak(tuple.from) }, 100);
  }

  relisten() {

    setTimeout(() => { this.speak(this.currentWord) }, 100);
  }

  /*
  // server code
  
  
  var http = require('http'),
    httpProxy = require('http-proxy');

// TODO: cache audio
var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
    req.headers.host = "translate.google.com";
    if (req.headers.referer) {
        req.headers.referer = 'http://translate.google.com' + req.url;
    }
    delete req.headers['x-playback-session-id'];
    // delete req.headers['upgrade-insecure-requests'];
    console.log(req.headers);
    proxy.web(req, res, { target: 'http://translate.google.com:80' });
    // TODO: 'access-control-allow-origin' = '*';
    // console.log(res);
});

console.log("listening on port 8081")
server.listen(8081, '0.0.0.0');

  
  
  */
  audio: any;
  server = '192.168.43.24:8081';
  speak(word: string) {
    let host = `http://${this.server}`;
    //https://cloud.google.com/speech/docs/languages
    let u = googleTTS.getAudioUrl(word, {
      lang: 'ja-JP',
      slow: false,
      host: host,
    });
    console.log(u);
    // alert(u);
    this.audio = new Audio(u);
    this.audio.play();//.finally((result: any) => { alert(result); });
    // alert('polay');
    return;

    if ('speechSynthesis' in window) {
      var synthesis = window.speechSynthesis;

      // 有点影响性能？
      if (synthesis.speaking) {
        synthesis.cancel();
      }

      // Get the first `en` language voice in the list
      // var voice = synthesis.getVoices().filter(function (voice) {
      //   return voice.lang === 'en';
      // })[0];


      // Create an utterance object
      var utterance = new SpeechSynthesisUtterance(word);

      // Set utterance properties
      // utterance.voice = voice;
      utterance.pitch = 1.0;
      utterance.rate = 0.8;
      utterance.volume = 1;
      // https://appmakers.dev/bcp-47-language-codes-list/
      utterance.lang = 'ja-JP';
      // utterance.lang = 'zh-CN';

      // Speak the utterance
      synthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported.');
    }

  }

  dontknow() {
    if (this.group2.value === 'deathmatch') {
      this.deck.push({ from: this.currentWord, to: this.currentPron, id: `${Math.random()}` });
      this.forgot.append(this.currentWord, this.currentPron);
      this.next();
    } else {

      this._snackbar.open('已添加', 'OK', { duration: 1000 });
      this.forgot.append(this.currentWord, this.currentPron);
    }
  }


  readShuffle() {
    const dialogRef = this.dialog.open(MakeConfirmComponent,
      { data: { yesText: '是', noText: '否', prompt: '确定洗牌吗？' } as ConfirmData } as MatDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {

        this.shuffle();
        this.start();
      }
    });
  }

  listenShuffle() {
    this.readShuffle();
  }

  deck: Word[] = [];
  cursor: number = 0;

  shuffle() {
    if (this.bs.currentBook) {
      this.deck = this.shuffle1([...this.bs.currentBook!!.book] as []);
      // console.log(this.deck);
      this.cursor = 0;
    } else {
      this.deck = [];
      this.cursor = 0;
    }
  }

  // https://stackoverflow.com/a/2450976
  private shuffle1(array: []) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }



}
