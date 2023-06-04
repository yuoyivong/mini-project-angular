import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskResponse } from 'src/app/models/response/task-response';
import { Task } from 'src/app/models/tasks.model';

@Component({
  selector: 'app-view-task-popup',
  templateUrl: './view-task-popup.component.html',
  styleUrls: ['./view-task-popup.component.css'],
})
export class ViewTaskPopupComponent implements OnInit {
  task$: Observable<Task[]> = this.store.select('tasks');

  constructor(private store: Store<{ tasks: Task[] }>) {}
  ngOnInit(): void {
    console.log('Data : ', this.task$);
  }

  getCardId(id: number) {
    console.log(id);
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
  isPopup = true;
  setIsPopup() {
    this.isPopup = !this.isPopup;
  }
}
