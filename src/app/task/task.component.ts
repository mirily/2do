import { Component, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TaskService } from '../service/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent {
  @Input() tasks;
  @Input() boardId;

  constructor(public dialog: MatDialog, private taskService: TaskService) {
  }

  renameTask(task) {
    const dialogRef = this.dialog.open(ModalTaskComponent, {
      width: '250px',
      data: { name: 'Rename you task', title: task.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.renameTask(this.boardId, task, result);
      }
    });
  }

  deleteTask(task) {
    const dialogRef = this.dialog.open(ModalTaskComponent, {
      width: '250px',
      data: { name: 'Delete task', info: `Are you sure you want to remove the task '${task.title}'?`, delete: true, task: task }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.taskService.deleteTask(this.boardId, result);
    });
  }

  isComplete() {
    console.log('complete');
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
        data.task = data.task;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
