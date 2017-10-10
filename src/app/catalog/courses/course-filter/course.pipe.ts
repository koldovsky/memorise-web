import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string, searchableList: any) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                let isTrue = false;
                for (var k in searchableList) {
                    if (el[searchableList[k]].toLowerCase().indexOf(input) > -1) {
                        isTrue = true;
                    }
                    if (isTrue) {
                        return el;
                    }
                }
            });
        }
        return value;
    }
}

// import { Pipe, PipeTransform} from '@angular/core';

// @Pipe({name: 'filter'})

// export class CoursePipe implements PipeTransform {
//     transform(courses, args: string) {
//         if ( args === undefined) {
//             return courses;
//         }
//         args = args.toLowerCase();
//         return courses.filter( it => {
//             return it.toLowerCase().includes(args);
//         });
//     }
// }
