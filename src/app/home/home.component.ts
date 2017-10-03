import { Component, OnInit  } from '@angular/core';
import { MessageService } from '../common/services/message.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'Memo Rise';
  description = 'Here you can improve your knowlage and train your memory by using spaced repetition lerning. Good luck!';

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.temp = null;
  }
}
