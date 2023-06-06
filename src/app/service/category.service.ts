import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environment/env';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  // get all category
  fetchAllCategories(): Observable<any> {
    return this.http.get(
      `${env.apiUrl}/category/get-all-category-by-current-user?asc=false&desc=false&page=1&size=10`
    );
  }

}
