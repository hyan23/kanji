import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scratch-card',
  templateUrl: './scratch-card.component.html',
  styleUrls: ['./scratch-card.component.css']
})
export class ScratchCardComponent {

  hide: boolean = true;
  @Input() value: string = '';
  over(e: MouseEvent) {
    // 这条似乎会让{{value}}在刷新几次后不起作用？
    // e.stopPropagation();
    this.hide = false;
    // console.log(this.hide);
  }

}
