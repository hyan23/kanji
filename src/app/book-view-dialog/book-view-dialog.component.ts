import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordBook } from '../book-shelf.service';

@Component({
  selector: 'app-book-view-dialog',
  templateUrl: './book-view-dialog.component.html',
  styleUrls: ['./book-view-dialog.component.css']
})
export class BookViewDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: WordBook) {
  }
}
