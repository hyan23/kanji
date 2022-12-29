import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ForgotWordListComponent } from './forgot-word-list/forgot-word-list.component';
import { TargetWordListComponent } from './target-word-list/target-word-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'kanji';
  @ViewChild('kanji') kanji: ElementRef;
  @ViewChild('pron') pron: ElementRef;

  @ViewChild('group') group: MatButtonToggleGroup;
  @ViewChild('target') target: TargetWordListComponent;
  @ViewChild('forgot') forgot: ForgotWordListComponent;

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
    this.kanji.nativeElement.innerText = `${this.target.cursor % this.target.deck.length + 1} / ${this.target.deck.length} ${tuple[0]}`;
    this.pron.nativeElement.innerText = tuple[1];
    this.target.cursor++;
    this.hide = true;
  }

  hide: boolean = true;

  over(e: MouseEvent) {
    e.stopPropagation();
    this.hide = false;
    // console.log(this.hide);
  }

  dontknow() {
    let k = this.kanji.nativeElement.innerText;
    let p = this.pron.nativeElement.innerText;
    this.forgot.append(k, p);
  }
}
