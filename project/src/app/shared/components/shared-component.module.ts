import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CircleCounterComponent } from './circle-counter/circle-counter.component';
import { FormatInputComponent } from './format-input/format-input.component';
import { TaiChiLoadingComponent } from './tai-chi-loading/tai-chi-loading.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CircleCounterComponent,
    FormatInputComponent,
    TaiChiLoadingComponent
  ],
  declarations: [
    CircleCounterComponent,
    FormatInputComponent,
    TaiChiLoadingComponent
  ]
})
export class SharedComponentModule { }
