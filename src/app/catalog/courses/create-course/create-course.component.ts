import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../common/services/auth.service';

@Component({
    selector: 'app-create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.css']
})

export class CreateCourseComponent implements OnInit {
    action: string;
    clicked = false;
    myForm: FormGroup;
    Matdialog: MatDialog;

    constructor(
        public dialogRef: MatDialogRef<CreateCourseComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public fb: FormBuilder,
        private authService: AuthService

    ) {
        this.action = data.action;
        this.myForm = this.fb.group({
            'name': new FormControl('', [
                Validators.required,
                Validators.maxLength(18)
            ]),
            'description': new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ])
        });
   }
    onNoClick(): void {
        this.dialogRef.close();
    }

    Create(course): void {
        // this.authService.signIn(user)
        //     .then(() => {
        //         if (this.authService.validData()) {
        //             this.dialogRef.close(this.myForm.controls['login'].value);
        //             this.authService.checkIfIsAuthorized();
        //         } else {
        //             this.myForm.controls.login.setValue('');
        //             this.myForm.controls.password.setValue('');
        //         }
        //     });
        // this.clicked = true;
        console.log(course);
    }

    ngOnInit(): void { }
}
