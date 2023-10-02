import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit, AfterContentChecked {
  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterContentChecked(): void {
    this.activatedRoute.queryParamMap.subscribe((res) => {
      console.log('Book id : ', res.get('id'));
      this.deleteBookId = +res.get('id')!;
    });
  }

  booksList: Book[] | undefined;
  deleteBookId: number = 0;

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
    this.router.navigate(['/book', id]);
  }

  // delete book by its id
  deleteBookById() {
    this.bookService.deleteBookById(this.deleteBookId).subscribe((res) => {
      console.log(res);
    });
  }
  
}
