import { createAction, props } from '@ngrx/store';
import { Task } from '../tasks.model';
import { TaskResponse } from '../response/task-response';

export const getAllTask = createAction(
  '[Board Component] Get All Task',
  props<{ tasks: Array<Task> }>()
);

export const deleteSpecificTaskById = createAction(
  '[Board Component] Delete Task By Id',
  props<{ taskId: number }>
);
