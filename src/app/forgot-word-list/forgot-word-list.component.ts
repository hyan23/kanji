import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookShelfService, Word } from '../book-shelf.service';
import { ConfirmData, MakeConfirmComponent } from '../make-confirm/make-confirm.component';
import { BookNameDialogComponent } from '../target-word-list/target-word-list.component';

@Component({
  selector: 'app-forgot-word-list',
  templateUrl: './forgot-word-list.component.html',
  styleUrls: ['./forgot-word-list.component.css']
})
export class ForgotWordListComponent {


  constructor(private clip: Clipboard, private dialog: MatDialog, private snackBar: MatSnackBar,
    private bs: BookShelfService) {

  }

  id: number = 0;
  append(a: string, b: string) {
    this.wordList.push({ from: a, to: b, id: `${this.id++}` });
  }

  wordList: Word[] = [];



  clear() {


    const dialogRef = this.dialog.open(MakeConfirmComponent,
      { data: { yesText: '是', noText: '否', prompt: '确定清空吗？' } as ConfirmData } as MatDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.wordList = [];
        this.id = 0;

      }
    });
  }

  save() {

    const dialogRef = this.dialog.open(BookNameDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.bs.saveBook({ book: this.wordList, name: result[0], id: `id-${Math.random()}`, raw: '', importTime: Date.now(), info: { desc: result[1] } });
    });
  }

  copy() {

    let s = '';
    for (let w of this.wordList) {
      s += w.from + ' ' + w.to + '\n';
    }
    this.clip.copy(s);
    this.snackBar.open('已拷贝', 'OK', { duration: 1000 });

  }
}
