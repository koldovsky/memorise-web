import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/models';
import { handleError } from '../functions/functions';

@Injectable()
export class AuthService {
  private commonUrl = 'http://localhost:37271/';
  constructor(private http:HttpClient) { 
    localStorage.setItem("token", "testtoken");
  }

   signIn(user:User){
    user.grant_type="password";
                return this.http.post(this.commonUrl+"memo/login",user)
                    .toPromise()
                    .then(response =>{
                        var us=response as User;
                        alert("Hello "+us.Login);
                        localStorage.setItem("token", response.toString());
                    } )
                    .catch(handleError)
    }
    signUp(user:User){
        
                   return this.http.post(this.commonUrl+"Account/SignUp",user)
                       .toPromise()
                       .then(response =>{
                           var us=response;
                           console.log(response);
                           //alert("You are registered with login: "+us.Login);
                       } )
                       .catch(handleError);
       }
    getToken(){
      return localStorage.getItem("token");
    }
}
