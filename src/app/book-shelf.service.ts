import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// 记单词本质是从一个事物认出另一个事物，例如从英语单词认出汉语释义、从英语语音认出英语单词
// 这种从一个事物到另一个事物的关系可以用二元组来表示
// 多个二元组可以表示更复杂的关系，如一个英语单词有多个汉语释义
// 用户希望怎么背就怎么导入
// 比如想从单词或发音认出词义
// 在导入时就可以选择“单词1、发音1 词义1”这样的格式
// 如果想从单词和发音认出词义
// 在导入时就可以选择“单词1，发音1 词义1”这样的格式
// 最终在数据层面产生两个`Word`对象即可

export interface Word {
  from: string;
  to: string;
  id: string;
}

export interface WorkBookInfo {
  author?: string;
  desc?: string;
}

export interface WordBook {
  book: Word[];
  name: string;
  id: string;
  raw: string;
  info?: WorkBookInfo;
  importTime: number;
}

export function parseRaw(raw: string): Word[] {
  let id = 0;
  let list: Word[] = [];
  let lines = raw.split(/\r?\n/g);
  lines.forEach((value) => {
    let sp = value.split(/\s+/).map(x => x.trim());
    if (sp.length == 2 && sp[0].length > 0 && sp[1].length > 0) {
      let left = sp[0].split(/、|、/g).map(x => x.trim()).filter(x => x.length > 0);
      let right = sp[1].split(/、|、/g).map(x => x.trim()).filter(x => x.length > 0);
      for (let i of left) {
        for (let j of right) {
          list.push({ from: i, to: j, id: `${id++}` });
        }
      }
    } else {
      console.log('warn: ' + value);
    }
  });
  return list;
}

@Injectable({
  providedIn: 'root'
})
export class BookShelfService {

  currentBook?: WordBook = undefined;

  constructor() {

  }

  bookShelfChanged: Subject<void> = new Subject();
  currentBookChanged: Subject<WordBook> = new Subject();

  use(book: WordBook) {
    this.currentBook = book;
    this.currentBookChanged.next(book);
  }

  saveBook(book: WordBook): boolean {
    try {
      localStorage.setItem(this.makeKey(book), JSON.stringify(book));
    } catch (e) {
      console.log(e);
      return false;
    }
    this.bookShelfChanged.next();
    return true;
  }

  removeBook(book: WordBook) {
    localStorage.removeItem(this.makeKey(book));
    this.bookShelfChanged.next();
  }

  allBooks(): WordBook[] {
    let arr = [] as WordBook[];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (this.isWordBook(key!!)) {
        let value = localStorage.getItem(key!!);
        let book = JSON.parse(value!!);
        arr.push(book);
      }
    }
    return arr;
  }

  private WORD_BOOK_KEY_PREFIX = "kanji-word-book-";
  private isWordBook(key: string): boolean {
    return key.startsWith(this.WORD_BOOK_KEY_PREFIX);
  }

  private makeKey(book: WordBook): string {
    return `${this.WORD_BOOK_KEY_PREFIX}${book.id}`;
  }
}
