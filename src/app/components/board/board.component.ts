import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store, createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  deleteSpecificTaskById,
  getAllTask,
} from 'src/app/models/action/task.actions';
import { TaskResponse } from 'src/app/models/response/task-response';
import { Task } from 'src/app/models/tasks.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  task$: Observable<Task[]> = this.store.select('tasks');

  constructor(
    private taskService: TaskService,
    private store: Store<{ tasks: Task[] }>
  ) {
    // this.task$ = store.pipe(select('tasks'));
  }

  fetchAndStoreTask() {
    this.taskService.fetchAllTasks().subscribe((response) => {
      console.log('Response : ', response.payload);
      this.store.dispatch(getAllTask({ tasks: response.payload }));
    });
  }

  // task$: Observable<TaskResponse<Tasks>>;

  // task$ = (state: TaskResponse<Tasks>) => console.log(state.payload);

  // get all tasks every time it renders
  ngOnInit(): void {
    this.fetchAndStoreTask();
  }

  // delete task by id
  delete_task_by_id(taskId: number) {
    this.taskService.deleteTaskById(taskId).subscribe((response) => {
      console.log('Response : ', response);
      this.fetchAndStoreTask();
      // this.store.dispatch(deleteSpecificTaskById());
    });
  }

  // format date
  formattedDate(date: string) {
    const newDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    console.log('Date : ', newDate);
    return newDate;
  }

  // popup to view the specific task
  isPopup = false;
  setIsPopup() {
    this.isPopup = !this.isPopup;
  }
}
