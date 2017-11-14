import { PaginationComponent } from './pagination.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
    let paginator: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;

    let el: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PaginationComponent]
        });

        fixture = TestBed.createComponent(PaginationComponent);

        paginator = fixture.componentInstance;
        paginator.totalCount = 100;
        paginator.pageSize = 5;
        paginator.currentIndex = 18;

        el = fixture.debugElement.query(By.css('.zz'));
    });

    it('GetNumberPagesTest', () => {
        fixture.detectChanges();
        expect(paginator.getLocalPagesCount()).toBe(20);
    });

    it('NumberToArrayTest', () => {
        fixture.detectChanges();
        const a = [];
        for (let i = 1; i <= 20; i++) {
            a.push(i);
        }
        for (let i = 1; i <= 20; i++) {
            a.push(i);
        }
        expect(paginator.numberToArray()).toEqual(a);
    });

    it('IsFirstEllipsisTest', () => {
        fixture.detectChanges();
        expect(paginator.isFirstEllipsis()).toBe(false);
    });

    it('IsLastEllipsis', () => {
        fixture.detectChanges();
        expect(paginator.isLastEllipsis()).toBe(true);
    });

    it('IsFirstTest', () => {
        fixture.detectChanges();
        expect(paginator.isFirst()).toBe(false);
    });

    it('IsLastTest', () => {
        fixture.detectChanges();
        expect(paginator.isLast()).toBe(false);
    });

    it('PageIndexTest', (done) => {
        fixture.detectChanges();
        paginator.pageIndex.subscribe(g => {
            expect(g).toEqual(18);
            done();
        });
        paginator.select(paginator.currentIndex);
    });

    it('MiddleItemsTest', () => {
        fixture.detectChanges();
        paginator.items.length = 4;
        paginator.select(1);
        expect(paginator.middleItems).toEqual([1, 2, 3, 4]);
    });

    it('OnNextTest', () => {
        fixture.detectChanges();
        paginator.onNext();
        expect(paginator.currentIndex).toBe(19);
    });

    it('OnPrevTest', () => {
        fixture.detectChanges();
        paginator.onPrev();
        expect(paginator.currentIndex).toBe(17);
    });

    it('ButtonNextTest', () => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent.trim()).toBe('Next');
    });

});

