import { IBoard } from '../models/board';

export const TASKS: IBoard[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
