import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';

@Component({
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.css']
})

export class UnauthorizedComponent implements OnInit {
    
    message:string;
        
    constructor(
        private auth: AuthService,
        private location: Location,
        private router: Router
    ) { }

    goHome(): void {
        this.router.navigate(['/home']);
    }
    ngOnInit(): void {
       this.message=this.auth.getError();
    }

    
}
