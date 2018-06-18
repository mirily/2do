import { ITask } from './task';

export interface IBoard {
  id: number;
  title: string;
  created: string;
  tasks?: ITask[];
}
