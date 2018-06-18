import { Injectable } from '@angular/core';
import { IBoard } from '../models/board';
import { TASKS } from '../data/data';
import { ITask } from '../models/task';

@Injectable()
export class TaskService {
  boards: IBoard[];

  constructor() {
    this.boards = TASKS;
  }

  AddNewTask(boardId: number, title: string) {
    let tasks: ITask[];
    tasks = this.boards[boardId - 1].tasks;
    const date = new Date;
    const id: number = tasks.length >= 1 ? tasks[tasks.length - 1].id + 1 : 1 + boardId * 10;
    console.log(this.boards);
    return this.boards.forEach(el => {
      if (el.id === boardId) {
        el.tasks.push({id: id, created: date.toString(), title: title, complete: false });
      }
    });
  }

  renameTask(boardId: number, task: ITask, title: string) {
    let tasks: ITask[];
    tasks = this.boards[boardId].tasks;
    return tasks.forEach(item => {
      if (item === task) {
        item.title = title;
      }
    });
  }

  deleteTask(boardId: number, task: ITask) {
    let tasks: ITask[] = this.boards[boardId].tasks;
    return tasks = tasks.filter(item => item !== task);
  }
}
