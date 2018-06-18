import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent {
  item = {
    complete: false
  };
  constructor(public dialog: MatDialog) { }

  renameTask(name = 'Item 1') {
    let dialogRef = this.dialog.open(ModalTaskComponent, {
      width: '250px',
      data: { name: 'Rename you task', title: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }

  deleteTask(name = 'Item 1') {
    let dialogRef = this.dialog.open(ModalTaskComponent, {
      width: '250px',
      data: { name: 'Delete task', info: `Are you sure you want to remove the task '${name}'?`, delete: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }
}

@Component({
  selector: 'app-madal-task',
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
export class ModalTaskComponent {
  deleteMod = false;
  constructor(
    public dialogRef: MatDialogRef<ModalTaskComponent>,
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
