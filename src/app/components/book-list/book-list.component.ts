import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, AfterContentChecked {
  bookCategory$: Category[] = [];
  searchCategory = new FormControl();
  categoryName$: string = '';
  categoryId$: number | undefined;

  constructor(
    private router: Router,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterContentChecked(): void {
    this.activatedRoute.queryParamMap.subscribe((res) => {
      this.categoryId$ = +res.get('categoryId')!;
      this.getCategoryName(this.categoryId$);
    });

    if (!this.categoryId$) {
      this.categoryName$ = 'all genres';
    }
  }

  ngOnInit(): void {
    this.getAllCategories();
    // this.activatedRoute.queryParamMap.subscribe((res) => {
    //   this.categoryId$ = +res.get('categoryId')!;
    //   this.getCategoryName(this.categoryId$);
    //   console.log('Category Name : ', this.categoryName$);
    // });
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

  // get category name
  getCategoryName(id: number) {
    console.log('Id : ', id);
    if (id) {
      this.bookCategory$.filter((cate) => {
        if (this.categoryId$ != 0 && cate.categoryId === id) {
          this.categoryName$ = cate.categoryName;
        }
      });
    }
  }
}
