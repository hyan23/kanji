import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-word-list',
  templateUrl: './forgot-word-list.component.html',
  styleUrls: ['./forgot-word-list.component.css']
})
export class ForgotWordListComponent {


  constructor(private clip: Clipboard) {

  }
  append(a: string, b: string) {
    this.wordList.push([a, b]);
  }

  wordList: string[][] = [];



  copy() {

    let s = '';
    for (let w of this.wordList) {
      s += w[0] + ' ' + w[1] + '\n';
    }
    this.clip.copy(s);
  }
}
