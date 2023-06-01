import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  // get all tasks
  fetchAllTasks(): Observable<any> {
    return this.http.get(
      `${env.apiUrl}/task/get-all-task-by-current-user?asc=false&desc=false&page=1&size=10`
    );
  }

  // delete specific task based on id
  deleteTaskById(taskId: number): Observable<any> {
    return this.http.delete(`${env.apiUrl}/task/delete-task-by-id/${taskId}`);
  }
}
