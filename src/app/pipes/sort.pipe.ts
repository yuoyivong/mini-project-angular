import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(values: Book[] | undefined, field: string): Book[] {
    values!.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });

    return values!;
  }
}
