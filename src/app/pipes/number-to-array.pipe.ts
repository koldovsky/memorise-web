import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToArray'
})

export class NumberToArrayPipeComponent implements PipeTransform {

    transform(array: number[], totalCount: number, pageSize: number): number[] {
        array = [];
        const pagesCount = totalCount / pageSize;
        let temp = Math.floor(pagesCount);
        if (temp < pagesCount) {
            temp++;
        }
        for (let i = 0; i < temp; i++) {
            array.push(i);
        }
        return array;
    }
}
