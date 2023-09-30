import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { KeycloakAuthGuard } from 'keycloak-angular';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthGuard } from './guard/auth.guard';
import { BookComponent } from './components/book/book.component';
import { ViewBookDetailsComponent } from './components/view-book-details/view-book-details.component';
import { AddOrEditBookComponent } from './components/add-or-edit-book.component/add-or-edit-book.component';
import { BookListComponent } from './components/book-list/book-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        // canActivate : [AuthGuard]
        children: [
          {
            path: 'book',
            component: BookComponent,
          },
        ],
      },

      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'book/:id',
        component: ViewBookDetailsComponent,
      },
      {
        path: 'addNewBook',
        component: AddOrEditBookComponent,
      },
      {
        path: 'bookList',
        component: BookListComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
