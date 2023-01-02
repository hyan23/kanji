import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookShelfService, parseRaw, Word } from '../book-shelf.service';
import { TakeImageDialogComponent } from '../take-image-dialog/take-image-dialog.component';




@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  template: `
  <mat-nav-list>
  <a href="#" mat-list-item (click)="fromCamera($event)">
    <span matListItemTitle>相机</span>
  </a>

  <a href="#" mat-list-item (click)="fromGallery($event)">
    <span matListItemTitle>相册</span>
  </a>
</mat-nav-list>`,
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    private dialog: MatDialog) { }

  fromCamera(event: MouseEvent): void {
    event.preventDefault();
    let dialogRef = this.dialog.open(TakeImageDialogComponent,
      {
        data: 'camera',
        panelClass: 'fullscreen-dialog'
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      this._bottomSheetRef.dismiss(result);
    });
  }


  fromGallery(event: MouseEvent): void {
    event.preventDefault();
    let dialogRef = this.dialog.open(TakeImageDialogComponent,
      {
        data: 'file',
        panelClass: 'fullscreen-dialog'
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      this._bottomSheetRef.dismiss(result);
    });
  }
}


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
  styleUrls: ['./target-word-list.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '32px',
      })),
      state('closed', style({
        height: '0px',
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
})
export class TargetWordListComponent {
  constructor(private bs: BookShelfService, private dialog: MatDialog, private snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) {
    setTimeout(() => {
      let book = this.bs.lastUsedBook();
      if (book) {
        this.open = true;
        setTimeout(() => {
          this.open = false;
        }, 3000);
      }

    }, 1000);


  }


  openBottomSheet(): void {
    let ref = this._bottomSheet.open(BottomSheetOverviewExampleSheet);
    ref.afterDismissed().subscribe((result: Word[]) => {
      console.log(result);
      if (result) {
        let tmp = '';
        for (let w of result) {
          tmp += `${w.from}|${w.to}\n`;
        }
        this.wordlist = tmp;
      }
    });
  }

  protected wordlist: string = "";

  open: boolean = false;
  // 单词表tips
  // 手机不同layout
  // 刮刮卡渐隐动画
  // parse去除空格
  // 生词表自动滚动
  // 组件化 禁止编辑 复制清空按钮


  importLastUsed(e: MouseEvent) {
    e.preventDefault();
    let book = this.bs.lastUsedBook();
    if (book) {
      this.bs.use(book!!);
      this.snackBar.open('已导入', 'OK', { duration: 1000 });
    } else {
      // TODO:
    }
    this.open = false;
  }

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
