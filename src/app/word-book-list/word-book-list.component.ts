import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith } from 'rxjs';
import { BookShelfService, WordBook } from '../book-shelf.service';
import { BookViewDialogComponent } from '../book-view-dialog/book-view-dialog.component';
import { ConfirmData, MakeConfirmComponent } from '../make-confirm/make-confirm.component';

@Component({
  selector: 'app-word-book-list',
  templateUrl: './word-book-list.component.html',
  styleUrls: ['./word-book-list.component.css']
})
export class WordBookListComponent {
  allBooks: WordBook[] = [];
  constructor(private bs: BookShelfService, private dialog: MatDialog, private clipboard: Clipboard,
    private snackbar: MatSnackBar) {
    this.bs.bookShelfChanged.pipe(startWith(0)).subscribe(() => {
      this.allBooks = this.bs.allBooks();
    });
  }
  @Input() name: string;
  books = ['四级核心A', '四级核心B', '四级核心C', '四级核心D', '四级核心E'];

  use(w: WordBook) {
    this.bs.use(w);
    this.snackbar.open('已导入', 'OK', { duration: 1000 });
  }

  copy(w: WordBook) {
    this.clipboard.copy(w.raw);
    this.snackbar.open('已复制', 'OK', { duration: 1000 });
  }

  view(w: WordBook) {
    const dialogRef = this.dialog.open(BookViewDialogComponent,
      { data: w } as MatDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {

      }
    });
  }

  del(w: WordBook) {
    const dialogRef = this.dialog.open(MakeConfirmComponent,
      { data: { yesText: '是', noText: '否', prompt: '确定删除吗？' } as ConfirmData } as MatDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.bs.removeBook(w);
      }
    });
  }
}
