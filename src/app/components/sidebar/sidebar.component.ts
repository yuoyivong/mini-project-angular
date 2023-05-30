import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isToggle = true;
  isChangedImage = true;

  setIsToggle() {
    this.isToggle = !this.isToggle;
    this.isChangedImage = !this.isChangedImage
  }

}
