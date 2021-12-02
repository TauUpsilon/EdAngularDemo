import { Directive, ElementRef, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { BaseInputLimitDirective } from './base-input-limit.directive';
import { BaseInputLimitInterface } from './base-input-limit.interface';

@Directive({
  selector: '[appLimitWithRegex]'
})
export class LimitWithRegexDirective extends BaseInputLimitDirective implements BaseInputLimitInterface, OnChanges {

  @Input() regex: RegExp;

  constructor(readonly elRef: ElementRef) {
    super(elRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'regex': {
            this.regularRegex = changes[propName].currentValue;
          }
        }
      }
    }
  }

  performKeyDown(event: KeyboardEvent): void {
    const currentVal: string = this.elRef.nativeElement.value.replace(/,/g, '');
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
