import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';
import { Book } from 'src/app/models/book';
import { Category } from 'src/app/models/category';
import { BookService } from 'src/app/services/book.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-add-or-edit-book',
  templateUrl: './add-or-edit-book.component.html',
  styleUrls: ['./add-or-edit-book.component.css'],
})
export class AddOrEditBookComponent implements OnInit {
  bookForm!: FormGroup;
  imageUrl: string | undefined;
  defaultImage = 'Rich People Problem.svg';
  bookCategory$: Category[] = [];
  id: number | null | undefined;
  title: string = '';
  tempBook!: Book;
  isUpdatedImage: boolean = false;
  bookCate$: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.id = +res.get('id')!;
    });

    this.bookForm = this.formBuilder.group({
      bookTitle: ['', [Validators.required]],
      author: ['', Validators.required],
      categoryId: this.formBuilder.array([], Validators.required),
      description: ['', Validators.required],
      image: ['', Validators.required],
    });

    console.log('Book Form Details : ', this.bookForm);

    this.getAllCategories();

    this.title = 'Add New Book';

    if (this.id) {
      // edit mode
      this.title = 'Edit Existing Book';
      this.bookService
        .getBookById(this.id)
        .pipe(first())
        .subscribe((item) => {
          console.log('Data : ', item.payload);

          this.tempBook = item.payload;
          this.bookCate$ = item.payload.categoryList.map(
            (cat) => cat.categoryId
          );

          this.bookForm.patchValue(item.payload);

          console.log('Book category : ', this.bookCate$);
        });
    }
  }

  // form validation control
  get form() {
    return this.bookForm.controls;
  }

  // image preview
  showPreview(event: any) {
    this.isUpdatedImage = true;

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
    console.log(this.bookForm.value);
    this.saveBook();
  }

  fileUpload(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.fileUploadService.uploadImage(this.bookForm.value.image).subscribe(
        (res) => {
          console.log('image name : ', res.payload);
          resolve(res.payload);
          // this.fileUploadService
          //   .getImageByItsName(res.payload)
          //   .subscribe((res) => console.log('response image : ', res));
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // create new book
  async createBook() {
    try {
      const image = await this.fileUpload();

      const bookData = {
        ...this.bookForm.value,
        image,
      };

      const response = await this.bookService
        .createNewBook(bookData)
        .toPromise();
      console.log('Book response : ', response);

      console.log(this.bookForm);
    } catch (error) {
      console.error(error);
    }
  }

  // update book by specific book id
  async updatedBookById() {
    try {
      if (this.isUpdatedImage) {
        let updatedBookData = {
          ...this.bookForm.value,
          image: (await this.fileUpload()) ?? this.bookForm.value.image,
        };

        const updatedBook = await this.bookService
          .updateBookById(this.id!, updatedBookData)
          .toPromise();
        console.log('Updated Book : ', updatedBook);
      } else {
        let currentCategory = {
          ...this.bookForm.value,
          categoryId: this.summaryCategories,
        };
        console.log('Category : ', currentCategory);

        this.bookService
          .updateBookById(this.id!, currentCategory)
          .subscribe((res) => console.log("Image isn't changed : ", res));
      }
    } catch (err) {
      console.error(err);
    }
  }

  // get existing categories and concat with the new categories
  get summaryCategories() {
    let categoryId = this.bookForm.value.categoryId;
    console.log('Category null or not? : ', categoryId);
    if (categoryId.length == 0) {
      categoryId = this.bookCate$;
    } else {
      categoryId = this.bookCate$.concat(categoryId);
    }
    return categoryId;
  }

  // update existing book
  private saveBook() {
    return this.id ? this.updatedBookById() : this.createBook();
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

  handleMultipleCategoriesCheck(e: any) {
    console.log('Event : ', e);

    const checkCategory: FormArray = this.bookForm.get(
      'categoryId'
    ) as FormArray;
    if (e.target.checked) {
      checkCategory.push(new FormControl(parseInt(e.target.value)));
    } else {
      console.log('Checked false : ', e.target.checked);
      console.log('Checked value : ', e.target.value);
      this.bookCate$ = this.bookCate$.filter((id) => id != e.target.value);
      console.log(this.bookCate$);

      let i: number = 0;
      checkCategory.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          console.log('Item : ', item.value);
          checkCategory.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
