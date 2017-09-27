import { Component, OnInit } from '@angular/core';
import { QuizService } from '../common/services/quiz.service';
import { Card } from '../common/models/models';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
  })
export class QuizComponent implements OnInit {
    constructor(
        private quizService: QuizService,
        private route: ActivatedRoute
    ) { }
    cards: Card[];

    ngOnInit(): void {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.quizService
        .GetCardsByDeck(decodeURIComponent(params.get('name'))))
        .subscribe(cards => {
            this.cards = cards;
        });
    }
}
