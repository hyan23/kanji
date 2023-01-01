import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookShelfService, parseRaw } from '../book-shelf.service';

@Component({
  selector: 'app-book-name-dialog',
  template: `<h1 mat-dialog-title>保存词书：</h1>
<div mat-dialog-content>
  <mat-form-field appearance="fill">
    <mat-label>词书名：</mat-label>
    <input matInput [(ngModel)]="bookName">
  </mat-form-field>
  <mat-form-field appearance="fill">
    <mat-label>备注：</mat-label>
    <textarea matInput [(ngModel)]="desc"></textarea>
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button matDialogClose>取消</button>
  <button mat-button [mat-dialog-close]="[bookName,desc]" cdkFocusInitial>保存</button>
</div>`,
})
export class BookNameDialogComponent {
  bookName: string;
  desc: string;
}

@Component({
  selector: 'app-target-word-list',
  templateUrl: './target-word-list.component.html',
  styleUrls: ['./target-word-list.component.css']
})
export class TargetWordListComponent {
  constructor(private bs: BookShelfService, private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  protected wordlist: string = "";


  // 单词表tips
  // 手机不同layout
  // 刮刮卡渐隐动画
  // parse去除空格
  // 生词表自动滚动
  // 组件化 禁止编辑 复制清空按钮


  import() {
    let list = parseRaw(this.wordlist);
    this.bs.use({ book: list, name: 'disposable', id: 'disposable', raw: this.wordlist, importTime: Date.now() })
    this.snackBar.open('已导入', 'OK', { duration: 1000 });

  }

  save() {
    const dialogRef = this.dialog.open(BookNameDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.bs.saveBook({ book: parseRaw(this.wordlist), name: result[0], id: `id-${Math.random()}`, raw: this.wordlist, importTime: Date.now(), info: { desc: result[1] } });
    });
  }


}
