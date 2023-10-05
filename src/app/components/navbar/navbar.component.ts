import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showHeader: boolean = true;
  showAuthButton: boolean = true;

  isToggle: boolean = false;

  setIsToggle() {
    console.log('Is toggle : ', this.isToggle);

    this.isToggle = !this.isToggle;
  }

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/login') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }
}
