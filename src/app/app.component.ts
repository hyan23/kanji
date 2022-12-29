import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ForgotWordListComponent } from './forgot-word-list/forgot-word-list.component';
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
  @ViewChild('target') target: TargetWordListComponent;
  @ViewChild('forgot') forgot: ForgotWordListComponent;
  @ViewChild('card1') card1: ScratchCardComponent;
  @ViewChild('card2') card2: ScratchCardComponent;
  @ViewChild('wc1') wc1: ScratchCardComponent;
  @ViewChild('wc2') wc2: ScratchCardComponent;

  constructor() {

  }

  ngAfterViewInit() {

    this.group.valueChange.subscribe(x => {
      if (this.group.value) {
        // alert(this.group.value);
        if (this.group.value === 'list') {
          this.target.shuffle();
          this.cli();
        }
      }
    });
    this.cli();
  }

  cli() {
    let tuple = this.target.deck[this.target.cursor % this.target.deck.length];
    this.wc1.value = `${this.target.cursor % this.target.deck.length + 1} / ${this.target.deck.length} ${tuple[0]}`;
    this.card1.value = tuple[1];
    this.currentWord = tuple[0];
    this.currentPron = tuple[1];
    this.target.cursor++;
    this.card1.hide = true;
  }

  currentWord: string = '';
  currentPron: string = '';

  // bug: 听力界面有滚动条
  // 听和读进度独立
  next() {

    let tuple = this.target.deck[this.target.cursor % this.target.deck.length];
    this.wc2.value = `${this.target.cursor % this.target.deck.length + 1} / ${this.target.deck.length}`;
    this.currentWord = tuple[0];
    this.currentPron = tuple[1];
    this.card2.value = tuple[0];
    this.card2.hide = true;
    setTimeout(() => { this.speak(tuple[0]) }, 100);
    this.target.cursor++;
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

    this.forgot.append(this.currentWord, this.currentPron);
  }
}
