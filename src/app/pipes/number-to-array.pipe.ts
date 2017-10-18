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
        let pagesCount: number;
        if (page === 0 && totalCount / pageSize > 5) {
             pagesCount = 3;
        } else {
             pagesCount = totalCount / pageSize;
        }

        let temp = Math.floor(pagesCount);
        if (temp < pagesCount) {
            temp++;
        }
        
        if (page === 0) {
           
            page = 1;
            for (let i = page; count < 3 && i < temp; i++) {
                array.push(i);
            }
        } else {
            for (let i = page; count < 3 && i < temp; i++) {
                array.push(i);
                count++;
            }
        }


        // for (let i = 1; i <= 3; i++) {
        //     for (let j = i; j <= temp + i - 3; j++) {
        //         array.push(j);
        //     }
        // }

        return array;
    }
}
