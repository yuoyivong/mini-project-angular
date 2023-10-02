import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environment/env';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  // upload image - post
  uploadImage(file: File) {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(`${env.baseUrl}/file`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'json',
    });
  }

  // get file image
  getImageByItsName(imageName: string) {
    return this.http.get(`${env.baseUrl}/file/${imageName}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
