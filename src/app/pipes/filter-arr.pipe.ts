import { Pipe, PipeTransform } from '@angular/core';

type Indexable<T = any> = {
  [key: string]: T
}

@Pipe({
  name: 'filterArr'
})
export class FilterArrPipe implements PipeTransform {

  transform<T extends Indexable>(items: T[], itemProp: keyof T, term: string): T[] {
    const regExp = new RegExp(term, 'i')
    return items.filter(item => regExp.test(item[itemProp]));
  }


}
