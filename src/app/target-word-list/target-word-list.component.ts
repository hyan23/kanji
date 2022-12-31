import { Component, EventEmitter, Output } from '@angular/core';
import { BookShelfService } from '../book-shelf.service';

@Component({
  selector: 'app-target-word-list',
  templateUrl: './target-word-list.component.html',
  styleUrls: ['./target-word-list.component.css']
})
export class TargetWordListComponent {
  constructor(private bs: BookShelfService) {

  }
  @Output() imported = new EventEmitter<void>();


  protected wordlist: string = "";

  private lines: string[];
  private dict: { [id: string]: string[] } = {};
  // 一个单词对应多个音？
  reverseDict: { [id: string]: string } = {};

  deck: string[][] = [];
  cursor: number = 0;
  // 单词表tips
  // 手机不同layout
  // 刮刮卡渐隐动画
  // parse去除空格
  // 生词表自动滚动
  // 组件化 禁止编辑 复制清空按钮
  protected init() {
    console.log(this.wordlist);
    this.lines = this.wordlist.split(/\r?\n/g);
    this.lines.forEach((value) => {
      let sp = value.split(/\s+/);
      if (sp.length == 2 && sp[0].trim().length > 0 && sp[1].trim().length > 0) {
        this.dict[sp[1]] = sp[0].split(/、|、/g);
      } else {
        console.log('warn: ' + value);
      }
    });
    console.log(this.dict);
    for (let a in this.dict) {
      for (let b of this.dict[a]) {
        this.reverseDict[b] = a;
      }
    }

    for (let a in this.reverseDict) {
      this.deck.push([a, this.reverseDict[a]]);
    }

    this.show = true;
    setTimeout(() => this.show = false, 1000);

    if (this.deck.length > 0 && this.imported) {
      this.imported.next();
    }
  }

  show: boolean = false;
  shuffle() {
    this.deck = this.shuffle1(this.deck as []);
    // console.log(this.deck);
    this.cursor = 0;
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
