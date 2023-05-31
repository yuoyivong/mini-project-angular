import { createReducer, on } from '@ngrx/store';
import { Tasks } from '../models/tasks.model';
import { TaskAction, TaskActionType } from '../models/action/task.actions';

export const initialState: Array<Tasks> = [
  {
    taskId: 25,
    taskName: 'gfsgfdsg',
    description: 'gfsdgdsgdg',
    date: '2023-04-06T04:55:00.000+00:00',
    userId: 3,
    status: 'is_in_progress',
    categoryId: 11,
  },
];

export function TaskReducer(
  state: Array<Tasks> = initialState,
  action: TaskAction
) {
  switch (action.type) {
    case TaskActionType.ADD_TASK:
      return [...state, action.payload];
    default:
      return state;
  }
}
