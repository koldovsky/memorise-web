import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../../common/models/models';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(companies: Course[], path: string[], order: number = 1): Course[] {

    // Check if is not null
    if (!companies || !path || !order) return companies;

    return companies.sort((a: Course, b: Course) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      // Order * (-1): We change our order
      return a > b ? order : order * (- 1);
    })
  }
}