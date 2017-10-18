import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';

@NgModule({
    imports: [
        ProfileRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})

export class ProfileModule { }
