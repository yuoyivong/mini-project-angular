import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllCategories } from 'src/app/models/action/category.action';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private store: Store<{ categories: Category[] }>
  ) {}

  category$: Observable<Category[]> = this.store.select('categories');
  // get all category
  fetchAllCategories() {
    this.categoryService.fetchAllCategories().subscribe((res) => {
      console.log(res.payload);
      this.store.dispatch(getAllCategories({categories : res.payload}));
    });
  }

  ngOnInit(): void {
    this.fetchAllCategories();
  }

  // // popup category
  // isCategoryPopup = false;
  // setIsCategoryPopup = (): void => {
  //   this.isCategoryPopup != this.isCategoryPopup;
  // };

  // popup to view the specific task
  isPopup = false;
  setIsPopup = (): void => {
    this.isPopup = !this.isPopup;
  };

  // format date
  formattedDate(date: string) {
    const newDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    console.log('Date : ', newDate);
    return newDate;
  }
}
