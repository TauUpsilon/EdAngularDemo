import { Directive, ElementRef, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { BaseInputLimitDirective } from './base-input-limit.directive';

@Directive({
  selector: '[appChineseInputLimit]'
})
export class ChineseInputLimitDirective extends BaseInputLimitDirective {

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
    const currentVal = this.elRef.nativeElement.value.toString();

    this.regex = /[^\x00-\x7F]/g;

    if (currentVal.match(this.regex)) {
      this.elRef.nativeElement.value = currentVal.replace(this.regex, '');
    }
  }
}
