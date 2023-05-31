import { Action } from "@ngrx/store";
import { Tasks } from "../tasks.model";

export enum TaskActionType {
    ADD_TASK = '[TASK] Add Task',
}

export class AddTaskAction implements Action {
    readonly type = TaskActionType.ADD_TASK;
    constructor(public payload : Tasks) {}
}

export type TaskAction = AddTaskAction