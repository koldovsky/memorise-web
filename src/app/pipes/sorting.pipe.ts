import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../common/models/models';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(companies: Course[], path: string[], order: number = 1): Course[] {

    if (!companies || !path || !order) return companies;

    return companies.sort((a: Course, b: Course) => {
      path.forEach(property => {
        a = a[property];
        b = b[property];
      });
      return a > b ? order : order * (- 1);
    });
  }
}
