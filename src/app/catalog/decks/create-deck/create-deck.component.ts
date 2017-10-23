import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

import { Deck, Category } from '../../../common/models/models';

import { AuthService } from '../../../common/services/auth.service';
import { CategoryService } from '../../../common/services/category.service';
import { DeckService } from '../../../common/services/deck.service';

import { handleError } from '../../../common/functions/functions';
import { regexExpression } from '../../../common/helpers/regexExpression';
import { errorMessages } from '../../../common/helpers/errorMessages';

@Component({
    selector: 'create-deck',
    templateUrl: './create-deck.component.html',
    styleUrls: ['./create-deck.component.css']
})

export class CreateDeckComponent implements OnInit {
    regex;
    error;
    submitMessage: string;
    deck: Deck;
    uploader: FileUploader;
    categories: Category[];
    isLoaded = false;
    isUnique = false;
    isPaid = false;
    afterCheck = false;

    @Output()
    afterDeckAdded: EventEmitter<Deck> = new EventEmitter<Deck>();

    uploadUrl = 'http://localhost:37271/Image/UploadPhotoForDeck';

    constructor(
        private authService: AuthService,
        private categoryService: CategoryService,
        private deckService: DeckService
    ) {
        this.deck = {
            Name: '',
            Linking: '',
            Description: '',
            Price: 0
        };
    }

    ngOnInit(): void {
        this.regex = regexExpression;
        this.error = errorMessages;
        this.categoryService.getCategories()
            .then(categories => {
                this.categories = categories;
                this.isLoaded = true;
            });
        this.uploader = new FileUploader({
            url: this.uploadUrl,
            queueLimit: 1,
            removeAfterUpload: true
        });
    }

    onSubmit(form: NgForm) {
        if (this.isUnique) {
            this.createDeck();
            form.reset();
            this.isUnique = false;
        } else {
            this.deckService.checkIfDeckExists(this.deck.Name)
                .subscribe(response => {
                    const result = response as Deck;
                    if (result.Name === 'unique') {
                        this.isUnique = true;
                        this.createLinking();
                        this.createDeck();
                        form.reset();
                        this.isUnique = false;
                    } else {
                        this.isUnique = false;
                        this.deck.Linking = '';
                        this.afterCheck = true;
                    }
                },
                err => (handleError)
                );
        }
    }

    createDeck() {
        this.deckService.createDeck(this.deck)
            .subscribe(deck => {
                this.submitMessage = 'Deck was created successfully';
                this.uploader.queue[0].url = `${this.uploadUrl}/${(deck as Deck).Linking}`;
                this.uploader.queue[0].alias = 'Photo';
                this.uploader.uploadAll();
                this.showSnackbar();
                this.afterDeckAdded.emit(deck as Deck);
            },
            err => {
                this.submitMessage = this.error.ERROR;
                this.showSnackbar();
            }
            );
    }

    showSnackbar() {
        const x = document.getElementById('snackbar')
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }

    checkName() {
        this.deckService.checkIfDeckExists(this.deck.Name)
            .subscribe(response => {
                const result = response as Deck;
                if (result.Name === 'unique') {
                    this.isUnique = true;
                    this.createLinking();
                } else {
                    this.isUnique = false;
                    this.deck.Linking = '';
                    this.afterCheck = true;
                }
            },
            err => (handleError)
            );
    }

    createLinking(): void {
        this.deck.Linking = this.deck.Name.replace(this.regex.LINKING, '');
    }
}
