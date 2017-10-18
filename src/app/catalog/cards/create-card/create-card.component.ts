// import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
// import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { Card, CardType, Deck, Answer} from '../../../common/models/models';

// import { AuthService } from '../../../common/services/auth.service';


// import { handleError } from '../../../common/functions/functions';
// import { regexExpression } from '../../../common/helpers/regexExpression';
// import { errorMessages } from '../../../common/helpers/errorMessages';
// import { Observable } from 'rxjs/Observable';

// @Component({
//     selector: 'create-card',
//     templateUrl: './create-card.component.html',
//     styleUrls: ['./create-card.component.css']
// })

// export class CreateCardComponent implements OnInit {
    
//     regex;
//     error; 
//    card: Card;
//    deck: Deck;
//    isLoaded:boolean = false;
//    isUnique:boolean = false;
//    isPaid:boolean = false;
//    afterCheck:boolean = false;
//    submitMessage:string='';
//    numbersOfQuestions: number[];
//    chosenNumbersOfQuestion:number;

//     constructor(
//         private authService: AuthService,
//         private categoryService:CategoryService,
//         private courseService: CourseService
//     ) { 
//         this.card = {
//             Question: '',
//             CardType: null,
//             Deck: null,
//             Answers: null
//         };
//         this.numbersOfQuestions = [1,2,3,4,5,6];
//       }

//       ngOnInit(): void {
//         this.regex = regexExpression;
//         this.error = errorMessages;

//         // this.categoryService.getCategories()
//         // .then(categories => {
//         //     this.categories = categories;
//         //     this.isLoaded = true;
//         // });
//     }

//     onSubmit(form: NgForm) {
//         if(this.isUnique){
//             this.createCourse();
//             form.reset();
//             this.isUnique=false;
//         }
        
//         else{
//             this.courseService.checkIfCourseExists(this.course.Name)
//            .subscribe(response =>{
//                let result=response as Course;
//                if(result.Name=='unique'){
//                   this.isUnique = true;
//                   this.createLinking();
//                   this.createCourse();
//                   form.reset();
//                   this.isUnique=false;
//                }
//                else{
//                   this.isUnique = false;
//                   this.course.Linking="";
//                   this.afterCheck=true;
//                }
//              },
//              err=>(handleError)
//             );
//         }
//     }

//     createCourse(){
//                 this.courseService.createCourse(this.course)
//                 .subscribe(course=>{
//                     this.submitMessage = "Course was created successfully";
//                     this.showSnackbar();
//                     this.afterCourseAdded.emit(course as Course);
//                 },
//                 err=>{
//                     this.submitMessage = this.error.ERROR;
//                     this.showSnackbar();
//                 }
//                 );
//     }

//     showSnackbar(){
//         var x = document.getElementById("snackbar")
//         x.className = "show";
//         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
//     }

//     checkName(){
//      this.courseService.checkIfCourseExists(this.course.Name)
//      .subscribe(response =>{
//          let result=response as Course;
//          if(result.Name=='unique'){
//             this.isUnique = true;
//             this.createLinking();
//          }
//          else{
//             this.isUnique = false;
//             this.course.Linking="";
//             this.afterCheck=true;
//          }
//        },
//        err=>(handleError)
//       );
//     }

//     createLinking():void{
//         this.course.Linking = this.course.Name.replace(this.regex.LINKING, "");
//     }
    
//     @Output() 
//     afterCardAdded: EventEmitter<Card>=new EventEmitter<Card>();
        
// }
