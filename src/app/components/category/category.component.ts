import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  constructor() {}

  // popup category
  isCategoryPopup = false;
  setIsCategoryPopup = (): void => {
    this.isCategoryPopup != this.isCategoryPopup;
  };
}
