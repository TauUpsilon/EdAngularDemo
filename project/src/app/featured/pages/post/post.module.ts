import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule
  ]
})
export class PostModule { }
