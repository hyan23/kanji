import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.css']
})
export class WordCardComponent {
  @Input() value: string = '';
}
