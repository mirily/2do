import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent {

  constructor(public dialog: MatDialog) { }


  showForm() {
    let dialogRef = this.dialog.open(AddNewModalComponent, {
      width: '250px',
      data: { name: 'Add new task', info: 'What\'s your task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }

  renameBoard(name = 'Simple') {
    let dialogRef = this.dialog.open(AddNewModalComponent, {
      width: '250px',
      data: { name: 'Rename you board', title: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }

  addNewBoard() {
    let dialogRef = this.dialog.open(AddNewModalComponent, {
      width: '250px',
      data: { name: 'Add new board', info: 'Enter the name of your Board' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }

  deleteBoard(name = 'Simple') {
    let dialogRef = this.dialog.open(AddNewModalComponent, {
      width: '250px',
      data: { name: 'Delete board', info: `Are you sure you want to remove the Board '${name}'?`, delete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }

}

@Component({
  selector: 'app-add-new',
  template: `<h1 mat-dialog-title>{{data.name}}</h1>
              <div mat-dialog-content>
                <p *ngIf="data.info">{{data.info}}</p>
                <mat-form-field *ngIf="!deleteMod">
                  <input matInput [(ngModel)]="data.task">
                </mat-form-field>
              </div>
              <div mat-dialog-actions>
                <button mat-button (click)="onNoClick()">No Thanks</button>
                <button mat-button [mat-dialog-close]="data.task" cdkFocusInitial>Ok</button>
              </div>`
})
export class AddNewModalComponent {
  deleteMod = false;
  constructor(
    public dialogRef: MatDialogRef<AddNewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.title) {
        data.task = data.title;
      }
      if (data.delete) {
        this.deleteMod = true;
        data.task = 'delete';
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
