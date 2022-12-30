import { Clipboard } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmData, MakeConfirmComponent } from '../make-confirm/make-confirm.component';

@Component({
  selector: 'app-forgot-word-list',
  templateUrl: './forgot-word-list.component.html',
  styleUrls: ['./forgot-word-list.component.css']
})
export class ForgotWordListComponent {


  constructor(private clip: Clipboard, private dialog: MatDialog) {

  }
  append(a: string, b: string) {
    this.wordList.push([a, b]);
  }

  wordList: string[][] = [];



  clear() {


    const dialogRef = this.dialog.open(MakeConfirmComponent,
      { data: { yesText: '是', noText: '否', prompt: '确定清空吗？' } as ConfirmData } as MatDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.wordList = [];

      }
    });
  }

  copy() {

    let s = '';
    for (let w of this.wordList) {
      s += w[0] + ' ' + w[1] + '\n';
    }
    this.clip.copy(s);
  }
}
