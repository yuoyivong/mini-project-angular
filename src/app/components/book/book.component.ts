import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  booksList: Book[] | undefined;
  deleteBookId: number = 0;
  categoryId: number | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((res) => {
      console.log('Book id on url : ', res.get('id'));
      console.log('Category id : ', res.get('categoryId'));
      this.deleteBookId = +res.get('id')!;
      this.categoryId = +res.get('categoryId')!;

      this.getBookByCategoryId();

      if (!this.categoryId) {
        this.getAllBooks();
      }
    });
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

  // // get book by categoryId
  getBookByCategoryId() {
    if (this.categoryId) {
      this.bookService.getBookByCategoryId(this.categoryId).subscribe((res) => {
        console.log('Get book by category id response : ', res);
        this.booksList = res;
      });
    }
  }
}
