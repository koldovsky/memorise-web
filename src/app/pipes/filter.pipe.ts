import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string, searchableList: any) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (element: any) {
                let isTrue = false;
                for (const temp in searchableList) {
                    if (element[searchableList[temp]].toLowerCase().indexOf(input) > -1) {
                        isTrue = true;
                    }
                    if (isTrue) {
                        return element;
                    }
                }
            });
        }
        return value;
    }
}
