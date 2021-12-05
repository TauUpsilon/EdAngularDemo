import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LimitWithNoChineseDirective } from './input-limit/limit-with-no-chinese.directive';
import { LimitWithRegexDirective } from './input-limit/limit-with-regex.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LimitWithRegexDirective,
    LimitWithNoChineseDirective
  ],
  declarations: [
    LimitWithRegexDirective,
    LimitWithNoChineseDirective
  ]
})
export class SharedDirectiveModule { }
