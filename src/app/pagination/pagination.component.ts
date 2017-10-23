import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NumberToArrayPipeComponent } from '../pipes/number-to-array.pipe';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
    constructor() { }

    @Input('total-count') totalCount: number;
    @Input('page-size') pageSize: number;

    @Output('page-index') pageIndex: EventEmitter<number> = new EventEmitter<number>();

    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<boolean>();
    @Input() page: number;

    previousNumber = 0;

    ngOnInit() {

    }

    onPrev(): void {
        this.goPrev.emit(true);
        this.previousNumber--;
    }

    onNext(next: boolean): void {
        this.goNext.emit(next);
        this.previousNumber++;
    }

    paging(page: number) {
        this.pageIndex.next(page);
        this.page = page;
        console.log(page);
        // this.temp = this.totalCount / this.pageSize;
    }

    lastPage(): boolean {
        if (this.page === 0 && this.pageSize === 0) {
            return true;
        }
        return this.pageSize * (this.page + 1) >= this.totalCount;
    }

    isEllipsis() {
        for (let i = 5; i < 9; i++) {
            return true;
        }
    }
}

