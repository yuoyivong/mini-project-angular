import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.css'],
})
export class CategoryPopupComponent {
  constructor() {}

  @Input() public onClose!: () => void;

  setIsPopup = () => {
    this.onClose();
  }
}
