import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category';

@Pipe({
  name: 'filterUniqueCategory',
})
export class FilterUniqueCategoryPipe implements PipeTransform {
  transform(categories: Category[]): any {

    // let uniqueArray = Array.from(new Set(categories))
    // let uniqueArray = [...new Set(categories.map((cat) => cat.categoryId))];
    // let uniqueArray = [
    //   ...new Map(
    //     categories.map((item: any) => [item[item.categoryId], item])
    //   ).values(),
    // ];
    
    let uniqueArray = categories.filter(
      (a, i) => categories.findIndex((s) => a.categoryId === s.categoryId) === i
    );
    console.log('Unique array : ', uniqueArray);

    return uniqueArray;
  }
}
