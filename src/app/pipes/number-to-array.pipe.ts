import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberToArray'
})

export class NumberToArrayPipeComponent implements PipeTransform {

    transform(array: number[], totalCount: number, pageSize: number, page: number): number[] {
        array = [];
        let count = 0;
        if (pageSize === 0) {
            pageSize = totalCount;
        }
        let pagesCount = totalCount / pageSize;
        const temp = Math.floor(pagesCount);
        if (temp < pagesCount) {
            pagesCount = temp;
            pagesCount++;
        }
        if (page === 0 && pagesCount > 5) {
            pagesCount = 3;
        }

        if (page === 0) {
            page = 1;
            for (let i = page; count < 3 && i < pagesCount - 1; i++) {
                array.push(i);
                count++;
            }
        } else {
            for (let i = page; count < 3 && i < pagesCount - 1; i++) {
                array.push(i);
                count++;
            }
        }
        return array;
    }
}
