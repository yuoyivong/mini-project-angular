import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  constructor(private bookService: BookService, private router: Router) {}
  booksList: Book[] | undefined;

  ngOnInit(): void {
    this.getAllBooks();

  }

  // get all books from book service
  getAllBooks() {
    this.bookService.getAllBooks().subscribe((res) => {
      console.log('All books : ', res);
      this.booksList = res;
    });
  }

  // get specific book by its id
  getBookById(id: number) {
    console.log('Book Id : ', id);
    this.router.navigate(['/book', id])
  }
  
}
