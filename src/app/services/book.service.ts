import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../environment/env';
import { Book } from '../models/book';
import { BookResponse } from '../models/book-response';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  // HTTP_OPTIONSS = {
  //   headers: new HttpHeaders({
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  //     'Access-Control-Allow-Headers':
  //       'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  //     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!!),
  //   }),
  // };

  // headers = new HttpHeaders()
  //   .set('Content-Type', 'application/json')
  //   .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
  //   .set('Access-Control-Allow-Headers', '*')
  //   .set('Access-Control-Allow-Origin', '*')
  //   .set('Accept', 'application/json');

  getAllBooks(): Observable<Book[]> {
    console.log(localStorage.getItem('token'));

    return this.http.get<Book[]>(`${env.baseUrl}/reader/allBooks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getBookById(bookId: number): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${env.baseUrl}/reader/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createNewBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${env.baseUrl}/book`, book, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateBookById(bookId: number, book: any): Observable<Book> {
    return this.http.put<Book>(`${env.baseUrl}/book/${bookId}`, book, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  deleteBookById(bookId: number): Observable<any> {
    return this.http.delete(`${env.baseUrl}/book/${bookId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
