import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BoardService } from '../service/board.service';
import { TaskService } from '../service/task.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent {
  boards;

  refresh: Subject<any> = new Subject();

  constructor(public dialog: MatDialog,
              private boardServise: BoardService,
              private taskService: TaskService) {
    this.boards = this.boardServise.returnBoards();
  }


  addTaskForm(boardId) {
    const dialogRef = this.dialog.open(AddNewModalComponent, {
      width: '250px',
      data: { name: 'Add new task', info: 'What\'s your task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.AddNewTask(boardId, result);
        this.refresh.next();
      }
    });
  }

  renameBoard(board) {
    const dialogRef = this.dialog.open(AddNewModalComponent, {
      width: '250px',
      data: { name: 'Rename you board', title: board.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardServise.renameBoard(board, result);
      }
    });
  }

  addNewBoard() {
    const dialogRef = this.dialog.open(AddNewModalComponent, {
      width: '250px',
      data: { name: 'Add new board', info: 'Enter the name of your Board' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardServise.addNewBoard(result);
      }
    });
  }

  deleteBoard(board) {
    const dialogRef = this.dialog.open(AddNewModalComponent, {
      width: '250px',
      data: { name: 'Delete board', info: `Are you sure you want to remove the Board '${board.title}'?`, delete: true, board: board }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.boards = this.boardServise.deleteBoard(result);
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
        data.task = data.board;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
