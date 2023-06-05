import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTaskBySpecificId } from 'src/app/models/action/task.actions';
import { TaskResponse } from 'src/app/models/response/task-response';
import { Task } from 'src/app/models/tasks.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-view-task-popup',
  templateUrl: './view-task-popup.component.html',
  styleUrls: ['./view-task-popup.component.css'],
})
export class ViewTaskPopupComponent implements OnInit {
  @Input() public onClose: () => void = () => {};

  // @Input() public viewTaskBySpecificId!: (id: number) => void;

  @Input() public task!: Task;

  // task$: Observable<Task[]> = this.store.select('tasks');

  constructor(
    private store: Store<{ tasks: Task[] }>,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // console.log('Data : ', this.task$);
    this.taskService.getTaskById(33).subscribe();
  }

  testGetFromParent(id: number) {
    console.log('ID : ', id);
    // this.viewTaskBySpecificId(id);
  }

  // get task id
  // viewTaskBySpecificId = (id: number): void => {
  //   console.log('Task id : ', id);
  //   this.taskService
  //     .getTaskById(id)
  //     .subscribe((res) => this.store.dispatch(getTaskBySpecificId()));

  // };

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
  // isPopup = true;
  setIsPopup = (): void => {
    this.onClose();
  };
}
