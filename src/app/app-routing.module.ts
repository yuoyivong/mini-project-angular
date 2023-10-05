import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
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
        children: [
          {
            path: 'book',
            component: BookComponent,
            loadChildren: () =>
              import('./feature/home-page/home-page.module').then(
                (m) => m.HomePageModule
              ),
          },
        ],
      },

      {
        path: 'login',
        component: LoginComponent,
        loadChildren: () =>
          import('./feature/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
      {
        path: 'book/:id',
        component: ViewBookDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          role: ['READER', 'AUTHOR'],
        },
      },
      {
        path: 'addNewBook',
        component: AddOrEditBookComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'AUTHOR',
        },
      },
      {
        path: 'editBook/:id',
        component: AddOrEditBookComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'AUTHOR',
        },
      },
      {
        path: 'bookList',
        component: BookListComponent,
        canActivate: [AuthGuard],
        data: {
          role: 'AUTHOR',
        },
        loadChildren: () =>
          import('./feature/book-list/book-list.module').then(
            (m) => m.BookListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
