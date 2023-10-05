import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from 'src/app/components/book-list/book-list.component';
import { ShareModule } from 'src/app/shared/share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookListComponent],
  imports: [CommonModule, ShareModule, ReactiveFormsModule, RouterModule],
  exports: [BookListComponent],
})
export class BookListModule {}
