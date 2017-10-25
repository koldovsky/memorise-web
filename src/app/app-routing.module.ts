import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized-component';
import { ProfileComponent } from './auth/user/profile/profile.component';
import { LoginComponent } from './auth/components/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },

    {
        path: 'profile/:name',
        component: ProfileComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
