import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
    constructor() { }
    pagesCount: number;
    currentIndex = 0;
    items = [];
    middleItems = [];
    comfortableNumbers = 5;
    comfortableMiddleNumbers = 3;
    private _totalCount: number;
    private _pageSize: number;

    @Input('total-count') set totalCount(value: number) {
        this.items = [];
        this._totalCount = value;
        this.numberToArray();
        this.select(1);
    }

    @Input('page-size') set pageSize(value: number) {
        this.items = [];
        this._pageSize = value;
        this.numberToArray();
        this.select(1);
    }

    @Output('pageIndex') pageIndex: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit() {
    }

    howMatchPage() {
        let localPagesCount: number;
        if (this._pageSize === 0) {
            this._pageSize = this._totalCount;
        }
        localPagesCount = this._totalCount / this._pageSize;
        const temp = Math.floor(localPagesCount);
        if (temp < localPagesCount) {
            localPagesCount = temp;
            localPagesCount++;
        }
        return localPagesCount;
    }

    numberToArray() {
        const getPages = this.howMatchPage();
        for (let i = 1; i <= getPages; i++) {
            this.items.push(i);
        }
        return this.items;
    }

    select(index) {
        this.pageIndex.next(index);
        this.currentIndex = index;
        if (this.items.length > this.comfortableNumbers) {
            if (index === 1) {
                this.middleItems = this.items.slice(index - 1, index + this.comfortableMiddleNumbers - 1);
            } else if (index === this.items.length) {
                this.middleItems = this.items.slice(index - this.comfortableMiddleNumbers, index + 1);
            } else {
                this.middleItems = this.items.slice(index - this.comfortableMiddleNumbers + 1, index + 1);
            }
        } else {
            this.middleItems = this.items;
        }
    }

    isFirstEllipsis() {
        if (this.items.length < this.comfortableNumbers + 1) {
            return true;
        }
        if (this.currentIndex > this.comfortableMiddleNumbers) {
            return false;
        } else {
            return true;
        }
    }

    isLastEllipsis() {
        if (this.items.length < this.comfortableNumbers + 1) {
            return true;
        }
        if (this.currentIndex > this.items.length - this.comfortableMiddleNumbers) {
            return true;
        } else {
            return false;
        }
    }

    isFirst() {
        if (this.currentIndex < this.comfortableMiddleNumbers ||
                this.items.length <= this.comfortableNumbers) {
            return true;
        } else {
            return false;
        }
    }

    isLast() {
        if (this.currentIndex > this.items.length - this.comfortableMiddleNumbers + 1 ||
                this.items.length <= this.comfortableNumbers) {
            return true;
        } else {
            return false;
        }
    }

    onNext() {
        this.select(this.currentIndex + 1);
    }

    onPrev() {
        this.select(this.currentIndex - 1);
    }
}

