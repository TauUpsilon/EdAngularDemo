import { Directive, ElementRef } from '@angular/core';
import { BaseNumInputLimitDirective } from './base-num-input-limit.directive';
import { BaseNumInputLimitInterface } from './base-num-input-limit.interface';

@Directive({
  selector: '[appLimitWithTwoDecimal]'
})
export class LimitWithTwoDecimalDirective extends BaseNumInputLimitDirective
  implements BaseNumInputLimitInterface {

  constructor(readonly elRef: ElementRef) {
    super(elRef);

    this.regularRegex = new RegExp(/^\d*\.?\d{0,2}$/g);
  }

  performKeyDown(event: KeyboardEvent): void {
    const currentVal: string = this.elRef.nativeElement.value;
    const position = this.elRef.nativeElement.selectionStart;

    const nextVal: string = [
      currentVal.slice(0, position),
      event.key === 'Decimal'
        ? '.'
        : event.key,
      currentVal.slice(position)
    ].join('');

    if (nextVal && !nextVal.match(this.regularRegex)) {
      event.preventDefault();
    }
  }
}
