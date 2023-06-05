import { createAction, props } from '@ngrx/store';
import { Task } from '../tasks.model';
import { TaskResponse } from '../response/task-response';

// get all task
export const getAllTask = createAction(
  '[Board Component] Get All Task',
  props<{ tasks: Array<Task> }>()
);

export const getTaskBySpecificId = createAction(
  '[Board Component] Get Task By Specific id',
  props<{ tasks: Task }>
);

// delete task by id
export const deleteSpecificTaskById = createAction(
  '[Board Component] Delete Task By Id',
  props<{ taskId: number }>
);
