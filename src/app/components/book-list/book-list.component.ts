import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {

  bookCategory$: Category[] = [];

  searchCategory = new FormControl();
  
  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  addNewBook() {
    this.router.navigate(['/addNewBook']);
  }

  // get all categories from services
  getAllCategories() {
    this.bookService
      .getAllBooks()
      .pipe(
        map((book$: Book[]) => {
          book$.map(
            (res) => {
              res.categoryList.forEach((category) => {
                this.bookCategory$ = this.bookCategory$.concat(category);
              });
            }

            // .map((cate) => {
            //   console.log(cate.categoryName);
            //   this.uniquesCategory.push(cate.categoryName);
            // })
            // .map((cate) => console.log(cate.categoryName))
          );
        })
      )
      .subscribe();
  }
}
