import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { ApiResponse } from 'src/app/models/api-response';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-view-book-details',
  templateUrl: './view-book-details.component.html',
  styleUrls: ['./view-book-details.component.css'],
})
export class ViewBookDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}
  bookId!: number;
  book!: Book;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      console.log(res.get('id'));
      this.bookId = +res.get('id')!;
    });
    this.getBookById();
  }

  getBookById() {
    this.bookService.getBookById(this.bookId).subscribe((res) => {
      console.log("Book details : ", res.payload);

      this.book = res.payload;
    });
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
