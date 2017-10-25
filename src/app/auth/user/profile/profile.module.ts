import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [
        ProfileRoutingModule,
        NgbModule.forRoot()
    ]
})

export class ProfileModule { }
