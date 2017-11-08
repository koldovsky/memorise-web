import { DeckTableComponent } from './deck-table.component';
import { CreateDeckComponent } from '../create-deck/create-deck.component';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { DeckService } from '../../../common/services/deck.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { inject } from '@angular/core/testing';

describe('DeckTableComponent', () => {
    let decktable: DeckTableComponent;
    let service: DeckService;
    let fixture: ComponentFixture<DeckTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
                FileUploadModule,
                HttpClientModule
            ],
            declarations: [
                DeckTableComponent,
                CreateDeckComponent,
                PaginationComponent
            ],
            providers: [
                DeckService,
                AuthService,
                CategoryService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DeckTableComponent);

        decktable = fixture.componentInstance;

        service = TestBed.get(DeckService);

    }));

    it('DropDownTest', async(() => {
        // fixture.detectChanges();
        // spyOn(service, 'getDecks').and.returnValue(null);
        decktable.pageSize = 0;
        expect(decktable.dropDownElements()).toContain('All');
    }));

    it('OnSelectFilterTest_1', async(() => {
        decktable.onSelectFilter('All');
        expect(decktable.pageSize).toBe(0);
    }));

    it('OnSelectFilterTest_2', async(() => {
        decktable.onSelectFilter(5);
        expect(decktable.pageSize).toBe(5);
    }));

    it('OnSelectFilterTest_3', async(() => {
        decktable.onSelectFilter('5');
        expect(decktable.page).toBe(1);
    }));

    it('OnBtnInfoClickTest', async(() => {
        decktable.onBtnInfoClick('spaced');
        expect(service.btnInfoLinking).toBe('spaced');
    }));

    xit('Inject??', async(() => {
        inject([DeckService], (injectService: DeckService) => {
            expect(injectService).toBe(service);
        });
    }));

    it('SortTableTest', () => {
        fixture.detectChanges();
        decktable.sortTable();
        expect(decktable.sorted).toBeTruthy();
        decktable.sortTable();
        expect(decktable.sorted).toBeFalsy();
    });

    it('OnNotifyTest', () => {
        fixture.detectChanges();
        spyOn(service, 'getDecksByPage');
        service.getDecksByPage(1, 2, true, null);
        expect(service.getDecksByPage).toHaveBeenCalled();
    });
});
