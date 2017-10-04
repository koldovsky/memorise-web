import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/models';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    constructor(private userService: UserService,
        //private user: User
    ) {
        

    }
    step = 0;
    
      setStep(index: number) {
        this.step = index;
      }
    
      nextStep() {
        this.step++;
      }
    
      prevStep() {
        this.step--;
      }

    ngOnInit(): void {
        //this.userService.getUser(this.user.Id)
            //.then(user => this.user = user);
    }    
}