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
        for (let i = 1; i <= this.howMatchPage(); i++) {
            this.items.push(i);
        }
        return this.items;
    }

    select(index) {
        this.pageIndex.next(index);
        this.currentIndex = index;
        if (this.items.length > 5) {
            if (index === 1) {
                this.middleItems = this.items.slice(index - 1, index + 2);
            } else if (index === this.items.length) {
                this.middleItems = this.items.slice(index - 3, index + 1);
            } else {
                this.middleItems = this.items.slice(index - 2, index + 1);
            }
        } else {
            this.middleItems = this.items;
        }
    }

    isFirstEllipsis() {
        if (this.items.length < 6) {
            return true;
        }
        if (this.currentIndex > 3) {
            return false;
        } else {
            return true;
        }
    }

    isLastEllipsis() {
        if (this.items.length < 6) {
            return true;
        }
        if (this.currentIndex > this.items.length - 3) {
            return true;
        } else {
            return false;
        }
    }

    isFirst() {
        if (this.currentIndex < 3 || this.items.length <= 5) {
            return true;
        } else {
            return false;
        }
    }

    isLast() {
        if (this.currentIndex > this.items.length - 2 || this.items.length <= 5) {
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

