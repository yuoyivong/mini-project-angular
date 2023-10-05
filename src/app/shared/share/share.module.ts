import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from 'src/app/components/book/book.component';
import { AddOrEditBookComponent } from 'src/app/components/add-or-edit-book.component/add-or-edit-book.component';
import { ViewBookDetailsComponent } from 'src/app/components/view-book-details/view-book-details.component';
import { AccessControlDirective } from 'src/app/directives/access-control.directive';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { FilterUniqueCategoryPipe } from 'src/app/pipes/filter-unique-category.pipe';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookComponent,
    AddOrEditBookComponent,
    ViewBookDetailsComponent,
    AccessControlDirective,
    SearchPipe,
    FilterUniqueCategoryPipe,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    BookComponent,
    AddOrEditBookComponent,
    ViewBookDetailsComponent,
    AccessControlDirective,
    SearchPipe,
    FilterUniqueCategoryPipe,
  ],
})
export class ShareModule {}
