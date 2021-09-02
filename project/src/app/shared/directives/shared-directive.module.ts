import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LimitWithTwoDecimalDirective } from './num-input-limit/limit-with-two-decimal.directive';
import { OnlyIntegerDirective } from './num-input-limit/only-integer.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LimitWithTwoDecimalDirective,
    OnlyIntegerDirective
  ],
  declarations: [
    LimitWithTwoDecimalDirective,
    OnlyIntegerDirective
  ]
})
export class SharedDirectiveModule { }
