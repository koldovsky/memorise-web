import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';

const route: Routes = [
    {
        path: 'profile/:name',
        component: ProfileComponent
    },
    {
        path: 'statistics/:name',
        component: StatisticsComponent
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

export class UserRoutingModule { }
