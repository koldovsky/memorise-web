import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title = 'Memo Rise';
  description = 'Here you can improve your knowlage and train your memory by using spaced repetition lerning. Good luck!';
}
