import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CircleCounterComponent } from './circle-counter/circle-counter.component';
import { FormatInputComponent } from './format-input/format-input.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CircleCounterComponent,
    FormatInputComponent
  ],
  declarations: [
    CircleCounterComponent,
    FormatInputComponent
  ]
})
export class SharedComponentModule { }
