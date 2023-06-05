import { createReducer, on } from '@ngrx/store';
import { Task } from '../models/tasks.model';
import * as TaskAction from '../models/action/task.actions';
import { TaskResponse } from '../models/response/task-response';

export const initialState: Array<Task> = [];
// {
//   taskId: 0,
//   taskName: '',
//   description: '',
//   date: '',
//   userId: 0,
//   status: '',
//   categoryId: 0,
// };

export const taskReducer = createReducer(
  initialState,
  on(TaskAction.getAllTask, (state, { tasks }) => tasks),
  on(TaskAction.deleteSpecificTaskById, (task) =>
    task.filter((taskId) => taskId !== taskId)
  ),
  on(TaskAction.getTaskBySpecificId, (task) => task)
);
