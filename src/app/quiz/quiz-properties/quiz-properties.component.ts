import { Component, OnInit, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Algorithm } from '../../common/models/models';

import { ModerationService } from '../../common/services/moderation.service';
import { QuizService } from '../../common/services/quiz.service';

import { handleError } from '../../common/functions/functions';
import { errorMessages } from '../../common/helpers/errorMessages';


@Component({
    selector: 'app-quiz-properties',
    templateUrl: './quiz-properties.component.html',
    styleUrls: ['./quiz-properties.component.css']
})

export class QuizPropertiesComponent implements OnInit {

    algorithm: Algorithm;
    algorithms: Algorithm[];
    isLoaded = false;
    submitMessage = '';
    error;

    constructor(
        private moderationService: ModerationService,
        private quizService: QuizService
    ) {
        this.algorithm = {
            Name: '',
            Description: '',
            IsActive: true
        };
    }

    ngOnInit(): void {
        this.error = errorMessages;
        this.quizService.GetAlgorithms()
            .subscribe(algorithms => {
                this.algorithms = algorithms as Algorithm[];
                this.algorithm = this.algorithms.find(algorithm => algorithm.IsActive === true);
                this.isLoaded = true;
            },
            err => (handleError)
        );
    }

    onSubmit(): void {
        this.quizService.ChangeAlgorithm(this.algorithm)
        .subscribe(algorithm => {
            this.submitMessage = 'The Algorithm was changed successfully';
            this.showSnackbar();
        },
        err => {
            this.submitMessage = this.error.ERROR;
            this.showSnackbar();
        }
        );
    }

    getChosenAlgorithm(selectedAlgorithmId: number) {
        this.algorithms.map(algorithm => algorithm.IsActive = false);
        this.algorithms.find(algorithm => algorithm.Id === Number(selectedAlgorithmId)).IsActive = true;
        this.algorithm = this.algorithms.find(algorithm => algorithm.Id === Number(selectedAlgorithmId));
    }

    showSnackbar() {
        const x = document.getElementById('snackbar');
        x.className = 'show';
        setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
    }

    setWhichButtonIsClicked() {
        this.moderationService.whichButtonIsClicked = 'courses';
    }

}
