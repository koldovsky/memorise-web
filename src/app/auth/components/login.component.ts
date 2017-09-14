import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { User } from '../../common/models/models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    action: string;

    constructor(
        public dialogRef: MdDialogRef<LoginComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) {
        this.action = data.action;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {
    }
}