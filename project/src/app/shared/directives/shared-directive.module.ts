import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LimitWithRegexDirective } from './input-limit/limit-with-regex.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LimitWithRegexDirective
  ],
  declarations: [
    LimitWithRegexDirective
  ]
})
export class SharedDirectiveModule { }
