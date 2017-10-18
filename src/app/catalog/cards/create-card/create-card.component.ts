// import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
// import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { Card, CardType, Deck} from '../../../common/models/models';

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

//     constructor(
//         private authService: AuthService,
//         private categoryService:CategoryService,
//         private courseService: CourseService
//     ) { 
//         this.course = {
//             Name: '',
//             Linking: '',
//             Description: '',
//             Price: 0
//         };
//       }

//     ngOnInit(): void {
//         this.categoryService.getCategories()
//         .then(categories => {
//             this.categories = categories;
//             this.isLoaded = true;
//         });
//     }

//     onSubmit() { 
//         this.courseService.createCourse(this.course)
//         .then(course=>{
//             this.submitMessage = "Course was created successfully";
//             this.showSnackbar();
//             this.afterCourseAdded.emit(course);
//         })
//         .catch(()=>{
//             this.submitMessage = "Error occurred. Please try again.";
//             this.showSnackbar();
//         })
//     }
//     showSnackbar(){
//         var x = document.getElementById("snackbar")
//         x.className = "show";
//         setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
//     }

//     checkName(){
//      this.courseService.checkIfCourseExists(this.course.Name)
//      .then(response =>{
//          if(response.Name=='unique'){
//             this.isUnique = true;
//             this.createLinking();
//          }
//          else{
//             this.isUnique = false;
//             this.course.Linking="";
//             this.afterCheck=true;
//          }
          
//      })
//      .catch(handleError);
//     }

//     createLinking():void{
//         this.course.Linking = this.course.Name.replace(/[^a-zA-Z0-9]/g, "");
//     }
    
//     @Output() 
//     afterCardAdded: EventEmitter<Card>=new EventEmitter<Card>();
        
// }
