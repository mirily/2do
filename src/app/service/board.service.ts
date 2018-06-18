import { Injectable } from '@angular/core';
import { IBoard } from '../models/board';
import { TASKS } from '../data/data';

@Injectable()
export class BoardService {
  boards: IBoard[];

  constructor() {
    this.boards = TASKS;
  }

  public returnBoards() {
    return this.boards;
  }

  public addNewBoard(title) {
    const data = new Date;
    let id;
    id = this.boards.length >= 1 ?  this.boards[this.boards.length - 1].id + 1 : 1;
    this.boards.push({id: id, title: title, created: data.toString(), tasks: []});
    localStorage.setItem('tasks', JSON.stringify(this.boards));
    return this.boards;
  }

  renameBoard(board, newTitle) {
    this.boards.forEach(item => {
      if (item === board) {
        item.title = newTitle;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.boards));
    return this.boards;
  }

  public deleteBoard(board) {
    this.boards = this.boards.filter(item => item !== board);
    localStorage.setItem('tasks', JSON.stringify(this.boards));
    return this.boards;
  }

}
