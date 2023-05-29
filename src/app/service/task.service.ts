import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environment/env';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http:HttpClient) { }

  fetchAllTask(): Observable<any> {
    return this.http.get(`${env.apiUrl}/task/get-all-task`)
  }
}
