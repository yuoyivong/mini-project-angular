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
  submiited = false;
  title: string = '';

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

    this.getAllCategories();

    this.title = 'Add New Book';
    if (this.id) {
      // edit mode
      this.title = 'Edit Existing Book';
      this.bookService
        .getBookById(this.id)
        .pipe(first())
        .subscribe((item) => {
          console.log("Data : ", item);
          
          this.bookForm.patchValue(item);
        });
    }
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
    console.log('Submitted');

    this.submiited = true;

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

  // update existing book
  private saveBook() {
    return this.id
      ? this.bookService.updateBookById(this.id, this.bookForm.value)
      : this.createBook();
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
    const checkCategory: FormArray = this.bookForm.get(
      'categoryId'
    ) as FormArray;
    if (e.target.checked) {
      checkCategory.push(new FormControl(parseInt(e.target.value)));
      console.log('Type of check box value : ', typeof e.target.value);
    } else {
      let i: number = 0;
      checkCategory.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkCategory.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
