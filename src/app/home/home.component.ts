import { Component, OnInit  } from '@angular/core';

import { MessageService } from '../common/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'Memo Rise';
  description = `Here you can improve your knowledge and train your
              memory by using spaced repetition learning. Good luck!`;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.temp = null;
  }
}
