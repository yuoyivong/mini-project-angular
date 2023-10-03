import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(values: Category[], searchTerm: string): any {
    if (!searchTerm) return values;
    if (values && searchTerm) {
      return values.filter((value) => {
        return value.categoryName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    }
    return null;
  }
}
