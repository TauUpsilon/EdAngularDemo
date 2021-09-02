import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CircleCounterComponent } from './circle-counter/circle-counter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CircleCounterComponent
  ],
  declarations: [
    CircleCounterComponent
  ]
})
export class SharedComponentModule { }
