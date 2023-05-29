import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css'],
})
export class TaskPageComponent implements OnInit {
  tasks = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.fetchAllTask().subscribe(res => {
      this.tasks = res.payload
    })
  }


}
