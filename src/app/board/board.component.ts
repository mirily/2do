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
    let dialogRef = this.dialog.open(AddNewModal, {
      width: '250px',
      data: { name: 'Add new task' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }

  renameBoard() {
    
    let dialogRef = this.dialog.open(AddNewModal, {
      width: '250px',
      data: { name: 'Rename you board', title: 'Simple' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }

}

@Component({
  selector: 'add-new',
  template: `<h1 mat-dialog-title>{{data.name}}</h1>
              <div mat-dialog-content>
                <p *ngIf="!data.title">What's your task?</p>
                <mat-form-field>
                  <input matInput [(ngModel)]="data.task">
                </mat-form-field>
              </div>
              <div mat-dialog-actions>
                <button mat-button (click)="onNoClick()">No Thanks</button>
                <button mat-button [mat-dialog-close]="data.task" cdkFocusInitial>Ok</button>
              </div>`
})
export class AddNewModal {

  constructor(
    public dialogRef: MatDialogRef<AddNewModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if (data.title) {
        data.task = data.title
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}