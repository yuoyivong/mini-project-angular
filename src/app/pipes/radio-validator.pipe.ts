import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'radioValidator'
})
export class RadioValidatorPipe implements PipeTransform {

  transform(value: any): ValidationErrors | null {
    if(!value['selected']) {
      return {required : true}
    }
    
    return null;
  }

}
