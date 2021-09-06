import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { SharedDirectiveModule } from 'src/app/shared/directives/shared-directive.module';
import { PostRoutingModule } from './post-routing.module';
import { PostPage } from './post.page';

@NgModule({
  declarations: [PostPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    SharedComponentModule,
    SharedDirectiveModule
  ]
})
export class PostModule { }
