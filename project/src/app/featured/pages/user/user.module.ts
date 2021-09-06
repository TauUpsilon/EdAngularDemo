import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { SharedDirectiveModule } from 'src/app/shared/directives/shared-directive.module';
import { UserRoutingModule } from './user-routing.module';
import { UserPage } from './user.page';

@NgModule({
  declarations: [UserPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedComponentModule,
    SharedDirectiveModule
  ]
})
export class UserModule { }
