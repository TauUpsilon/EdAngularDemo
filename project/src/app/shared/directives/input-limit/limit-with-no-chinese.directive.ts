import { Directive, ElementRef, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { BaseInputLimitDirective } from './base-input-limit.directive';

@Directive({
  selector: '[appLimitWithNoChinese]'
})
export class LimitWithNoChineseDirective extends BaseInputLimitDirective {

  MANDARIN_REGEX = /[^\x00-\x7F]/g;

  constructor(readonly elRef: ElementRef) {
    super(elRef);
  }

  performKeyDown(event: KeyboardEvent): void {

  }
  performCompositionStart(event: CompositionEvent): void {

  }
  performCompositionUpdate(event: CompositionEvent): void {

  }

  performCompositionEnded(event: CompositionEvent) {
    const currentVal: string = this.elRef.nativeElement.value;

    if (currentVal.match(this.MANDARIN_REGEX)) {
      this.elRef.nativeElement.value = currentVal.replace(/[^\x00-\x7F]/g, '');
    }
  }
}
