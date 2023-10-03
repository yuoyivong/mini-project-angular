import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-or-edit-book',
  templateUrl: './add-or-edit-book.component.html',
  styleUrls: ['./add-or-edit-book.component.css'],
})
export class AddOrEditBookComponent implements OnInit {
  bookForm!: FormGroup;
  imageUrl: string | undefined;
  defaultImage = 'Rich People Problem.svg';
  bookCategory$: Category[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      bookTitle: ['', [Validators.required]],
      author: ['', Validators.required],
      categoryList: ['', [Validators.required]],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });

    this.getAllCategories();
  }

  // image preview
  showPreview(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.bookForm.patchValue({
      image: file,
    });
    this.bookForm.get('image')?.updateValueAndValidity();

    // file preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    if (file) {
      console.log('File : ', file.name);
      reader.readAsDataURL(file);
    }
  }

  submitBook() {
    const bookData = {
      ...this.bookForm.value,
      image: this.bookForm.value.image.name,
    };
    console.log(bookData);
  }

  createBook() {
    const bookData = {
      ...this.bookForm.value,
      image: this.bookForm.value.image.name,
    };

    this.bookService.createNewBook(bookData).subscribe((res) => {
      console.log(res);
    });
  }

  // get all categories from services
  getAllCategories() {
    this.bookService
      .getAllBooks()
      .pipe(
        map((book$: Book[]) => {
          console.log(
            'Response : ',
            book$.map(
              (res) => {
                console.log(res.categoryList);
                this.bookCategory$?.concat(...res.categoryList)
                this.bookCategory$ = [...res.categoryList];
              }

              // .map((cate) => {
              //   console.log(cate.categoryName);
              //   this.uniquesCategory.push(cate.categoryName);
              // })
              // .map((cate) => console.log(cate.categoryName))
            )
          );
        })
      )
      .subscribe((res) => console.log(res));
  }
}
