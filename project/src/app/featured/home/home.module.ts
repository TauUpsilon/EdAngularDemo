import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { SharedDirectiveModule } from 'src/app/shared/directives/shared-directive.module';
import { PostPage } from './components/post/post.page';
import { PostRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  declarations: [
    HomePage,
    PostPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    SharedComponentModule,
    SharedDirectiveModule
  ]
})
export class HomeModule { }
