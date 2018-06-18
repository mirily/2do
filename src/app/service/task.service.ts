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
    this.boards.forEach(el => {
      if (el.id === boardId) {
        el.tasks.push({id: id, created: date.toString(), title: title, complete: false });
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.boards));
    return this.boards;
  }

  renameTask(boardId: number, task: ITask, title: string) {
    this.boards.forEach(item => {
      if (item.id === boardId) {
        item.tasks.forEach(e => {
          if (e === task) {
            e.title = title;
          }
        });
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.boards));
    return this.boards;
  }

  deleteTask(boardId: number, task: ITask) {
    this.boards.forEach(item => {
      if (item.id === boardId) {
        item.tasks = item.tasks.filter(i => i !== task);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.boards));
    return this.boards;
  }

  isComplete(boardId: number, task: ITask) {
    this.boards.forEach(item => {
      if (item.id === boardId) {
        item.tasks.forEach(e => {
          if (e === task) {
            e.complete = !e.complete;
          }
        });
      }
    });
    localStorage.setItem('tasks', JSON.stringify(this.boards));
    return this.boards;
  }
}
