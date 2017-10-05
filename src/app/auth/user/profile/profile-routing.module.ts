import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';

const route: Routes = [
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(route)
    ],
    exports: [
        RouterModule
    ]
})

export class ProfileRoutingModule { }
