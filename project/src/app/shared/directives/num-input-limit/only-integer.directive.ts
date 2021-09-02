import { Directive, ElementRef } from '@angular/core';
import { BaseNumInputLimitDirective } from './base-num-input-limit.directive';
import { BaseNumInputLimitInterface } from './base-num-input-limit.interface';

@Directive({
  selector: '[appOnlyInteger]'
})
export class OnlyIntegerDirective extends BaseNumInputLimitDirective
  implements BaseNumInputLimitInterface {

  constructor(readonly elRef: ElementRef) {
    super(elRef);

    this.regularRegex = new RegExp(/^\d*$/g);
  }

  performKeyDown(event: KeyboardEvent): void {
    const currentVal: string = this.elRef.nativeElement.value;
    const position = this.elRef.nativeElement.selectionStart;

    const nextVal: string = [
      currentVal.slice(0, position),
      event.key,
      currentVal.slice(position)
    ].join('');

    if (nextVal && !nextVal.match(this.regularRegex)) {
      event.preventDefault();
    }
  }
}
